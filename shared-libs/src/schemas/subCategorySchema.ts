import { z } from "zod";

const baseSubCategorySchema = z.object({
  name: z.string({ error: "Subcategory name is required" })
    .min(1, { error: "Subcategory name is required" })
    .max(50, { error: "Subcategory name must not exceed 50 characters" }),

slug: z
    .string({ error: "Slug is required" })
    .min(1, { error: "Slug is required" })
    .max(50, { error: "Slug must not exceed 50 characters" })
    .regex(/^(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/, {
      error: "Slug must be lowercase, hyphenated, and alphanumeric only",
    }),
});

export const createSubCategorySchema = baseSubCategorySchema.required({
  name: true,
  slug: true,
});

export type CreateSubCategoryInput = z.infer<typeof createSubCategorySchema>;