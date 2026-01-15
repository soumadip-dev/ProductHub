import { Router } from 'express';
import { requireAuth } from '@clerk/express';

const router = Router();

router.post('/sync', requireAuth(), async (req, res) => {});

export default router;
