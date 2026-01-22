import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment is required')
    .max(2000, 'Comment must be at most 2000 characters'),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
