import type { Express, NextFunction, Request, Response } from 'express';

import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './middlewares/error.middleware';
import configureCors from './config/cors.config';
import rateLimit, { type RateLimitRequestHandler } from 'express-rate-limit';
import logger from './utils/logger.utils';
import healthRoutes from './routes/health.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import commentRoutes from './routes/comment.routes';

import { clerkMiddleware } from '@clerk/express';

const app: Express = express();

// Rate limit
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip} 🚫`);
    res.status(429).json({ message: 'Too many request', success: false });
  },
});

app.use(morgan('dev'));
app.use(helmet());
app.use(configureCors());
app.use(express.json()); // parse json request to body
app.use(express.urlencoded({ extended: true })); // parse form data (like html form)
app.use(limiter);
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Received ${req.method} request to ${req.url} 📨`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
});
app.use(clerkMiddleware());

// Home route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'ProductHub server is running 🏚️',
    endpoint: {
      health: '/api/health',
      users: '/api/users',
      products: '/api/products',
      comments: '/api/comments',
    },
    success: true,
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
