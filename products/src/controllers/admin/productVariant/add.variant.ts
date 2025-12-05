// products/src/controllers/admin/product/addVariant.ts
import { BadRequestError, CreateProductVariantInput, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { publish_product_variant_created } from "../../../events/publishers/product-variant-created";
import { Product } from "../../../models/productModel";
import { ProductVariants } from "../../../models/productVariantModel";

const addVariant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      throw new BadRequestError("Product id required");
    }

    const { size, price, quantity, isActive = true }: CreateProductVariantInput = req.body;

    const variantData: CreateProductVariantInput = {
      size,
      quantity,
      price,
      productId,
      isActive,
    };

    const newVariant = await ProductVariants.create(variantData);

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $addToSet: { variantIds: newVariant._id },
      },
      { new: true }
    );

    if (newVariant && product) {
      publish_product_variant_created({
        variantId: newVariant._id.toString(),
        productId: product._id.toString(),
        size: newVariant.size,
        price: newVariant.price,
        quantity: newVariant.quantity,
        isActive: newVariant.isActive ?? true,
      });
    }

    sendResponse(res, 201, {
      success: true,
      message: "Product variant created successfully",
      data: newVariant,
    });
  } catch (error) {
    console.error("Error while adding product variant:", error);
    next(error);
  }
};

export { addVariant };
