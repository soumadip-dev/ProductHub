import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),

  imageUrl: z.string().url('Please enter a valid image URL'),

  description: z
    .string()
    .min(1, 'Description is required')
    .max(2000, 'Description must be at most 2000 characters'),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
