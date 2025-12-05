//shared-libs/src/schemas/mongoIdValidationSchema.ts
import { z } from 'zod'; // Use standard 'zod' import

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const mongoIdValidationSchema = z.object({
  id: z.string({ error: 'Id is required' })
    .min(1, { error: 'Id is required' })
    .regex(objectIdRegex, { error: 'Invalid id' }),
});