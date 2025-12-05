import { z } from "zod";
import { paginationSchema } from "./commonSchema";

export const categoryBaseSchema = z.object({
  name: z.string().min(1, { error: "Category name is required" }).max(50, { error: "Category name must not exceed 100 characters" }),

  slug: z
    .string()
    .min(1, { error: "Slug is required" })
    .max(50, { error: "Slug must not exceed 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase, hyphenated, and alphanumeric only",
    }),
});

export const addCategorySchema = categoryBaseSchema.required({
  name: true,
  slug: true,
});

export const getCategoriesQuerySchema = paginationSchema.extend({
  isActive: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),

  sort: z.enum(["name_asc", "name_desc", "newest"]).default("name_asc"),
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuerySchema>;
export type AddCategory = z.infer<typeof addCategorySchema>;