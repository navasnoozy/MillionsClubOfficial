import { z } from 'zod/v4';

export const subcategoryBaseSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Subcategory name is required' })
    .max(50, { message: 'Subcategory name must not exceed 100 characters' }),

  slug: z
    .string()
    .min(1, { message: 'Slug is required' })
    .max(50, { message: 'Slug must not exceed 100 characters' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug must be lowercase, hyphenated, and alphanumeric only'
    }),

  parentCategoryId: z
    .string()
    .min(1, { message: 'Parent category ID is required' })
});


export const addSubCategorySchema = subcategoryBaseSchema.required ({
     name: true,
     slug: true,
     parentCategoryId:true
});

export type AddSubCategory = z.infer<typeof addSubCategorySchema>;