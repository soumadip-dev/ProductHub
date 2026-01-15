import { Router } from 'express';

import { createComment, deleteComment } from '../controllers/comment.controller';

const router = Router();

router.post('/comments', createComment);
router.delete('/comments/:commentId', deleteComment);

export default router;
