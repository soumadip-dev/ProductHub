import { Router } from "express";
import logger from "../utils/logger.utils";

const router = Router();

router.get('/health', (req, res) => {
  logger.info('Health check request received 📨');
  res.status(200).json({
    message: 'OK',
    success: true,
  });
});

export default router;
