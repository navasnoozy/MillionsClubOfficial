// shared-libs/src/schemas/subCategorySchema.ts
import { z } from "zod/v4";

export const subcategoryBaseSchema = z.object({
  name: z.string().min(1, { error: "Subcategory name is required" }).max(50, { error: "Subcategory name must not exceed 100 characters" }),

  slug: z
    .string()
    .min(1, { error: "Slug is required" })
    .max(50, { error: "Slug must not exceed 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      error: "Slug must be lowercase, hyphenated, and alphanumeric only",
    }),
});

export const addSubCategorySchema = subcategoryBaseSchema.required({
  name: true,
  slug: true,
});

export type AddSubCategory = z.infer<typeof addSubCategorySchema>;