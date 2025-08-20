import { z } from "zod/v4";

export const categoryBaseSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name is required" })
    .max(50, { message: "Category name must not exceed 100 characters" }),

  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(50, { message: "Slug must not exceed 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase, hyphenated, and alphanumeric only",
    }),
});

export const addCategorySchema = categoryBaseSchema.required({
  name: true,
  slug: true,
});

export type AddCategory = z.infer<typeof addCategorySchema>;
