//shared-libs/src/schemas/productVariantSchema.ts

import { z } from "zod/v4";

export const productVariantBaseSchema = z.object({
  productId: z
    .string()
    .min(1, { message: "Product ID is required" }),

  size: z
    .string()
    .min(1, { message: "Size is required" }),

  price: z
    .number({ message: "Price must be a numeric value" })
    .nonnegative({ message: "Price must be a positive number" }),

  quantity: z
    .number({ message: "Quantity must be a number" })
    .int({ message: "Quantity must be an integer" })
    .min(0, { message: "Quantity cannot be negative" }),

  isActive: z
    .boolean()
    .optional(),
});

export const addProductVariantSchema = productVariantBaseSchema.required({
  productId: true,
  size: true,
  price: true,
  quantity: true,
  // isActive stays optional
});

export type AddProductVariant = z.infer<typeof addProductVariantSchema>;
