import { Router } from 'express';

import { createComment, deleteComment } from '../controllers/comment.controller';

const router = Router();

router.post('/:productId', createComment);
router.delete('/:commentId', deleteComment);

export default router;
