import { Router } from 'express';
import { requireAuth } from '@clerk/express';

import { syncUser } from '../controllers/user.controller';

const router = Router();

router.post('/sync', requireAuth(), syncUser);

export default router;
