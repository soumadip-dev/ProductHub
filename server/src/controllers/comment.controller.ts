import type { Request, Response } from 'express';

import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';
import logger from '../utils/logger.utils';
import { validateComment } from '../utils/validation.utils';

//* Create comment
async function createComment(req: Request, res: Response) {
  logger.info('🎯 Creating comment endpoint hit ');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const { productId } = req.params;

    if (Array.isArray(productId)) {
      logger.warn('⚠️ Invalid productId - expected single value');
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID',
      });
    }

    const { error } = validateComment(req.body);
    if (error) {
      logger.warn(`⚠️ Validation error: ${error.details[0]?.message}`);
      return res.status(400).json({
        success: false,
        error: error.details[0]?.message,
      });
    }
    const { content } = req.body;

    if (!productId) {
      logger.warn('🚫 Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }

    const product = await queries.getProductById(productId);

    if (!product) {
      logger.warn(`❌ Product not found with ID: ${productId}`);
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const comment = await queries.createComment({
      content,
      userId,
      productId,
    });

    logger.info(`✅ Comment created successfully`);

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      data: comment,
    });
  } catch (error) {
    logger.error('💥 Error creating comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create comment',
    });
  }
}

//* Delete Comment
async function deleteComment(req: Request, res: Response) {
  logger.info('🎯 Deleting comment endpoint hit ');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }

    const { commentId } = req.params;

    // Fix: Add type checking for commentId
    if (!commentId) {
      logger.warn('🚫 Missing comment ID');
      return res.status(400).json({
        success: false,
        error: 'Missing comment ID',
      });
    }

    if (Array.isArray(commentId)) {
      logger.warn('⚠️ Invalid commentId - expected single value');
      return res.status(400).json({
        success: false,
        error: 'Invalid comment ID',
      });
    }

    const existingComment = await queries.getCommentById(commentId);

    if (!existingComment) {
      logger.warn(`❌ Comment not found with ID: ${commentId}`);
      return res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
    }

    if (existingComment.userId !== userId) {
      logger.warn(`❌ You can only delete your own comments`);
      return res.status(403).json({
        success: false,
        error: 'You can only delete your own comments',
      });
    }

    await queries.deleteComment(commentId);
    logger.info(`✅ Comment deleted successfully`);
    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    logger.error('💥 Error deleting comment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete comment',
    });
  }
}
export { createComment, deleteComment };
