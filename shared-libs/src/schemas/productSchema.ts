import { z } from "zod";
import { paginationSchema } from "./commonSchema";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const baseProductSchema = z.object({
  id: z.string().optional(),

  title: z.string({ error: "Title is required" }).min(1, { error: "Title is required" }).max(100, { error: "Title must not exceed 100 characters" }),

  brand: z
    .string({ error: "Brand name is required" })
    .min(1, { error: "Brand name is required" })
    .max(50, { error: "Brand name must not exceed 50 characters" })
    .regex(/^[A-Za-z0-9\s]*$/, {
      error: "Brand name can include letters and numbers only",
    }),

  color: z
    .string()
    .min(1, { error: "Color cannot be empty" })
    .max(30, { error: "Color must not exceed 30 characters" })
    .regex(/^[A-Za-z0-9\s]*$/, { error: "Color must contain only letters or numbers" })
    .optional(),

  categoryId: z.string({ error: "Category is required" }).min(1, { error: "Category is required" }),

  subCategoryId: z.string({ error: "Sub-category is required" }).min(1, { error: "Sub-category is required" }),

  basePrice: z.number({ error: "Price must be a numeric value" }).nonnegative({ error: "Base price must be a positive number" }).optional(),

  description: z.string().max(1000, { error: "Description too long" }).optional(),

  isActive: z
    .enum(["true", "false"],)
    .transform((val) => val === "true")
    .optional(),

  images: z
    .array(
      z.object({
        secure_url: z.url({ error: "Each image must be a valid URL" }),
        public_id: z.string({ error: "Invalid publicId" }).min(1, { error: "Public id is required" }),
      },{error:'Image url and public id should be provided'})
    )
    .length(4, { error: "Exactly 4 images are required" })
    .optional(),
});

export const createProductSchema = baseProductSchema.required({
  title: true,
  brand: true,
  categoryId: true,
  subCategoryId: true,
  images: true,
});

export const updateProductSchema = baseProductSchema.partial();

export const productQuerySchema = paginationSchema
  .extend({
    categoryId: z.string().regex(objectIdRegex, { error: "Invalid Category ID" }).optional(),

    subCategoryId: z.string().regex(objectIdRegex, { error: "Invalid SubCategory ID" }).optional(),

    brand: z.string().optional(),

    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),

    sort: z.enum(["newest", "price_asc", "price_desc", "name_asc", "name_desc"]).default("newest"),

    isActive: z
      .enum(["true", "false"])
      .transform((val) => val === "true")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice != null && data.maxPrice != null) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: "Min price cannot be greater than Max price",
      path: ["minPrice"],
    }
  );

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
