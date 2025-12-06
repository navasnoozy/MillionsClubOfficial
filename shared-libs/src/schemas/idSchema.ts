//shared-libs/src/schemas/mongoIdValidationSchema.ts
import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const idSchema = z.object({
  id: z.string({ error: "Id is required" }).min(1, { error: "Id is required" }).regex(objectIdRegex, { error: "Invalid id" }),
}).strict();
