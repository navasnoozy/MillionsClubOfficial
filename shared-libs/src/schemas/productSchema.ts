import { z } from "zod/v4";

export const productBaseSchema = z.object({
  id: z.string().optional(),

  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title must not exceed 100 characters" }),

  brand: z
    .string()
    .min(1, { message: "Brand name is required" })
    .max(50, { message: "Brand name must not exceed 50 characters" })
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Brand name can include letters and numbers only",
    }),

  color: z
    .string()
    .min(1, { message: "Color cannot be empty" })
    .max(30, { message: "Color must not exceed 30 characters" })
    .regex(/^[A-Za-z0-9\s]+$/, { message: "Color must contain only letters or numbers" })
    .optional(),

  categoryId: z.string().min(1, { message: "Category is required" }),

  subCategoryId: z.string().min(1, { message: "Sub-category is required" }),

  basePrice: z.number({ message: "Price must be a numberic value" }).nonnegative({ message: "Base price must be a positive number" }).optional(),

  description: z.string().max(1000, { message: "Description too long" }).optional(),

  isActive: z.boolean("Active status must be provided"),

  images: z
    .array(
      z.object({
        secure_url: z.url({ message: "Each image must be a valid URL" }),
        public_id: z.string("Invalid publicId").min(1, { message: "Public id is required" }),
      })
    )
    .length(4, { message: "Exactly 4 images are required" })
    .optional(),

  variantIds: z
    .array(z.string().min(1, { message: "Variant must be required" }))
    .min(1, { message: "At least one variant is required" })
    .optional(),
});

// Required fields for creation
export const addProductSchema = productBaseSchema.required({
  title: true,
  brand: true,
  categoryId: true,
  subCategoryId: true,
  images: true,
});

// Optional fields for update
export const updateProductSchema = productBaseSchema.partial();

export type AddProductSchema = z.infer<typeof addProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
