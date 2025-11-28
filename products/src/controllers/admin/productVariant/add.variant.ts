// products/src/controllers/admin/product/addVariant.ts
import { AddProductVariant, BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { ProductVariants } from "../../../models/productVariantModel";
import { Product } from "../../../models/productModel";
import { removeImageTags } from "../../../services/removeImageTags";

const addVariant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      throw new BadRequestError("Product id required");
    }

    const { color, size, images, isActive }: AddProductVariant = req.body;

    const variantData: AddProductVariant = {
      color,
      size,
      images,
      productId,
      isActive,
    };

    const publicIds = images?.map((img) => img.public_id) ?? [];
    if (publicIds.length > 0) {
      await removeImageTags(publicIds);
    }

    const newVariant = await ProductVariants.create(variantData);

    await Product.findByIdAndUpdate(productId, {
      $addToSet: { variantIds: newVariant._id },
    });

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
