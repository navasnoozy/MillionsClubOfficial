import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number({ error: "Page must be a number" }).min(1, { error: "Page number required" }).default(1),

  limit: z.coerce.number({ error: "Limit must be a number" }).min(1, { error: "Limit required" }).max(50, { error: "Limit cannot exceed 50 items" }).default(10),

     isActive: z
      .union([z.boolean(), z.string()])
      .refine((val) => val === true || val === false || val === "true" || val === "false", {
        error: "Invalid isActive status. Allowed values: true, false, 'true', 'false'",
      })
      .transform((val) => val === true || val === "true")
      .optional(),

  role : z.enum(["user", "admin", "moderator"]).optional(),

  search: z.string().trim().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
