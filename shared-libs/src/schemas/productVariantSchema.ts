import { optional, url, z } from "zod/v4";

const productVariantBaseSchema = z.object({
  color: z
    .string("Invalid color name")
    .min(1, { message: "Color is required" }),

  size: z.string().min(1, { message: "Size is required" }),

  images: z
    .array(
      z.object({
        secure_url: z.url({ message: "Each image must be a valid URL" }),
        public_id: z
          .string("Invalid publicId")
          .min(1, { message: "Public id is required" }),
      })
    )
    .length(4, { message: "Exactly 4 images are required" }),

      price: z
    .number({message:'Price must be a numberic value'})
    .nonnegative({ message: "Price must be a positive number" })
    .optional(),

  productId: z
    .string()
    .min(1, { message: "Product ID is required" })
    .optional(),

  isActive: z.boolean("Active status must be provided").optional(),
});

export const addProductVariantSchema = productVariantBaseSchema.required({
  color: true,
  size: true,
  images: true,
  isActive: true,
});

export type AddProductVariant = z.infer<typeof addProductVariantSchema>;
