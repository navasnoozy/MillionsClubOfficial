import mongoose from 'mongoose';
import { z } from 'zod/v4';

export const mongoIdValidationSchema = z.object({
  id: z
    .string({ message: 'Id is required' })
    .nonempty({ message: 'Product Id is required' })
    .min(1, { message: 'Id is required' })
    .refine((id) => mongoose.Types.ObjectId.isValid(id), { message: 'Invalid id' }),
});
