import { z } from "zod";

export const paginationSchema = z
  .object({
    page: z.coerce.number({ error: "Page must be a number" }).min(1, { error: "Page number required" }).default(1),

    limit: z.coerce.number({ error: "Limit must be a number" }).min(1, { error: "Limit required" }).max(50, { error: "Limit cannot exceed 50 items" }).default(10),

    status: z
      .enum(["active", "inactive", "blocked"], {
        error: "Status must be one of: active, inactive, blocked",
      })
      .optional(),

    isActive: z
      .union([z.boolean(), z.string()])
      .refine((val) => val === true || val === false || val === "true" || val === "false", {
        error: "Invalid isActive status. Allowed values are: boolean (true, false),string ('true', 'false')",
      })
      .transform((val) => val === true || val === "true")
      .optional(),

    isDeleted: z
      .union([z.boolean(), z.string()])
      .refine((val) => val == true || val === false || val === "true" || val === "false", { error: "Invalid isDeleted status. Allowed values are: boolean (true, false), string ('true', 'false')" })
      .optional(),

    role: z.enum(["customer", "admin", "moderator"], { error: "Invalid role" }).optional(),

    search: z.string().trim().optional(),
  })
  .strict();

export type PaginationInput = z.infer<typeof paginationSchema>;
