// shared-libs/src/schemas/commonSchema.ts
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number({ invalid_type_error: "Page must be a number" }).min(1,{message:'Page number requered'}).default(1),

  limit: z.coerce.number({ message: "Limit must be a number" }).min(1,{message:'limit requered'}).max(50, "Limit cannot exceed 50 items").default(10),

  search: z.string().trim().optional(),
});
