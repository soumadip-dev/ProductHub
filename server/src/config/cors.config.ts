import type { CorsOptions } from 'cors';
import cors from 'cors';
import { env } from './env.config';
import logger from '../utils/logger.utils';

//* Function that creates and returns a configured CORS middleware instance
const configureCors = () => {
  const allowedOrigins: string[] = [];

  // Production frontend URL
  if (env.FRONTEND_URL) {
    allowedOrigins.push(env.FRONTEND_URL);
  }

  // Development frontend URLs
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:3000');
    allowedOrigins.push('http://127.0.0.1:3000');
  }

  const options: CorsOptions = {
    origin: (
      origin: string | undefined,
      callback: (error: Error | null, allow: boolean) => void
    ) => {
      // allow request with no origin (e.g. mobile apps - react-native or Postman) or allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) {
        logger.info(`CORS allowed for origin: ${origin || 'Unknown'} ✅`);
        callback(null, true);
      } else {
        logger.warn(`CORS denied for origin: ${origin} ❌`);
        callback(null, false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Version'],
    exposedHeaders: ['X-Total-Count', 'Content-Range'],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  };
  logger.info(`CORS middleware configured with ${allowedOrigins.length} allowed origins ✅`);
  return cors(options);
};

export default configureCors;
