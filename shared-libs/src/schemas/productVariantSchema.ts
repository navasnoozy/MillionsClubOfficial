import { z } from "zod";

// Internal Base Schema
const baseProductVariantSchema = z.object({
  productId: z.string({ error: "Product ID is required" }).min(1, { error: "Product ID is required" }),

  size: z.string({ error: "Size is required" }).min(1, { error: "Size is required" }),

  price: z.number({ error: "Price must be a numeric value" }).nonnegative({ error: "Price must be a positive number" }),

  quantity: z.number({ error: "Quantity must be a number" }).int({ error: "Quantity must be an integer" }).min(0, { error: "Quantity cannot be negative" }),

  isActive: z
    .union([z.boolean(), z.string()])
    .refine((val) => val === true || val === false || val === "true" || val === "false", {
      error: "Invalid isActive status. Allowed values: true, false, 'true', 'false'",
    })
    .transform((val) => val === true || val === "true")
    .optional(),
});

export const createProductVariantSchema = baseProductVariantSchema.required({
  productId: true,
  size: true,
  price: true,
  quantity: true,
});

export type CreateProductVariantInput = z.infer<typeof createProductVariantSchema>;
