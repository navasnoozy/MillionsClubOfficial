import { z } from "zod";
import { paginationSchema } from "./commonSchema";

const baseCategorySchema = z.object({
  name: z.string({ error: "Category name is required" })
    .min(1, { error: "Category name is required" })
    .max(50, { error: "Category name must not exceed 50 characters" }),

  slug: z
    .string({ error: "Slug is required" })
    .min(1, { error: "Slug is required" })
    .max(50, { error: "Slug must not exceed 50 characters" })
    .regex(/^[a-z0-9]*(?:-[a-z0-9]+)*$/, {
      error: "Slug must be lowercase, hyphenated, and alphanumeric only",
    }),
});

export const createCategorySchema = baseCategorySchema.required({
  name: true,
  slug: true,
});

export const categoryQuerySchema = paginationSchema.extend({
 isActive: z.boolean().optional(),

  sort: z.enum(["name_asc", "name_desc", "newest"]).default("name_asc"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type CategoryQueryInput = z.infer<typeof categoryQuerySchema>;