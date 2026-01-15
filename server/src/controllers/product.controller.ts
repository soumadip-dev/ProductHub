import type { Request, Response } from 'express';

import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';
import logger from '../utils/logger.utils';
import { validateProductCreate, validateProductUpdate } from '../utils/validation.utils';

//* Get all products
async function getAllProducts(req: Request, res: Response) {
  logger.info('🎯 Getting all products endpoint hit ');
  try {
    const products = await queries.getAllProducts();
    logger.info(`✅ Successfully fetched ${products.length} products`);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    logger.error('💥 Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
}

//* Get products of the logged in user
async function getMyProducts(req: Request, res: Response) {
  logger.info('🎯 Getting products of the logged in user endpoint hit 🎯');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const products = await queries.getProductByUserId(userId);
    logger.info(`✅ Successfully fetched ${products.length} products for user ${userId}`);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    logger.error('💥 Error fetching user products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
}

//* Get product by id
async function getProductById(req: Request, res: Response) {
  logger.info('🎯 Getting product by id endpoint hit ');
  try {
    const { id } = req.params;
    if (!id) {
      logger.warn('🚫 Missing required fields - Product ID is required');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const product = await queries.getProductById(JSON.stringify(id));
    if (!product) {
      logger.warn(`❌ Product not found with ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    logger.info(`✅ Product fetched successfully - ID: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    logger.error('💥 Error fetching product by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product',
    });
  }
}

//* Create product
async function createProduct(req: Request, res: Response) {
  logger.info('🎯 Creating product endpoint hit ');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { error } = validateProductCreate(req.body);
    if (error) {
      logger.warn(`⚠️ Validation error: ${error.details[0]?.message}`);
      return res.status(400).json({
        success: false,
        error: error.details[0]?.message,
      });
    }
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
      logger.warn('🚫 Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    logger.info(`✅ Product created successfully`);
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    logger.error('💥 Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
    });
  }
}

//* Update product
async function updateProduct(req: Request, res: Response) {
  logger.info('🎯 Updating product endpoint hit');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { id } = req.params;
    if (!id) {
      logger.warn('🚫 Missing required fields - Product ID is required');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    const { error } = validateProductUpdate(req.body);
    if (error) {
      logger.warn(`⚠️ Validation error: ${error.details[0]?.message}`);
      return res.status(400).json({
        success: false,
        error: error.details[0]?.message,
      });
    }
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(JSON.stringify(id));
    if (!existingProduct) {
      logger.warn(`❌ Product not found - ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    if (existingProduct.userId !== userId) {
      logger.warn(`🚫 Unauthorized - User ${userId} is not the owner of product ${id}`);
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const product = await queries.updateProduct(JSON.stringify(id), {
      title,
      description,
      imageUrl,
    });

    logger.info(`✅ Product updated successfully - ID: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    logger.error('💥 Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
    });
  }
}

//* Delete product
async function deleteProduct(req: Request, res: Response) {
  logger.info('🎯 Deleting product endpoint hit');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { id } = req.params;
    if (!id) {
      logger.warn('🚫 Missing required fields - Product ID is required');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    const existingProduct = await queries.getProductById(JSON.stringify(id));
    if (!existingProduct) {
      logger.warn(`❌ Product not found - ID: ${id}`);
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    if (existingProduct.userId !== userId) {
      logger.warn(`🚫 Unauthorized - User ${userId} is not the owner of product ${id}`);
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    await queries.deleteProduct(JSON.stringify(id));
    logger.info(`✅ Product deleted successfully - ID: ${id}`);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    logger.error('💥 Error deleting product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete product',
    });
  }
}

export {
  getAllProducts,
  getMyProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
