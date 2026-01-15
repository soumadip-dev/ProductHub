import type { Request, Response } from 'express';

import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';
import logger from '../utils/logger.utils';

//* Get all products
async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await queries.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
}

//* Get products of the logged in user
async function getMyProducts(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.error('Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const products = queries.getProductByUserId(userId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
}

//* Get product by id
async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      logger.error('Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const products = await queries.getCommentById(JSON.stringify(id));
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: products,
    });
  } catch (error) {
    logger.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
}

//* Create product
async function createProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl) {
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
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    logger.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product',
    });
  }
}

//* Update product
async function updateProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(JSON.stringify(id));
    if (!existingProduct) {
      logger.info('Product not found');
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    if (existingProduct.userId !== userId) {
      logger.info('Unauthorized - User is not the owner of the product');
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
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    logger.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update product',
    });
  }
}

//* Delete product
async function deleteProduct(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { id } = req.params;
    if (!id) {
      logger.info('Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    const existingProduct = await queries.getProductById(JSON.stringify(id));
    if (!existingProduct) {
      logger.info('Product not found');
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    if (existingProduct.userId !== userId) {
      logger.info('Unauthorized - User is not the owner of the product');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    await queries.deleteProduct(JSON.stringify(id));
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting product:', error);
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
