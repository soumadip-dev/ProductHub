import type { Request, Response } from 'express';
import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';
import logger from '../utils/logger.utils';

async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      logger.error('Unauthorized - No userId found from Clerk');
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      });
    }
    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      logger.error('Missing required fields');
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

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error('Error syncing user:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync user',
    });
  }
}

export { syncUser };
