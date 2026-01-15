import type { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';
import logger from '../utils/logger.utils';
import { validateUser } from '../utils/validation.utils';

//* Sync user
async function syncUser(req: Request, res: Response) {
  logger.info('🎯 Syncing user endpoint hit');
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.warn('❌ Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { error } = validateUser(req.body);

    if (error) {
      logger.warn(`⚠️ Validation error: ${error.details[0]?.message}`);
      return res.status(400).json({
        success: false,
        error: error.details[0]?.message,
      });
    }
    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      logger.warn('🚫 Missing required fields');
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    logger.info('✅ User synced successfully');
    res.status(200).json({
      success: true,
      message: 'User synced successfully',
      data: user,
    });
  } catch (error) {
    logger.error('💥 Error syncing user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync user',
    });
  }
}

export { syncUser };
