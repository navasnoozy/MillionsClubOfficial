import { AddProductVariant, sendResponse } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { ProductVariants } from "../../../models/productVariantModel";
import { Product } from "../../../models/productModel";

const addVariant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;

    const { color, size, images, isActive } = req.body;

    const productVariant: AddProductVariant = {
      color,
      size,
      images,
      productId: _id,
      isActive,
    };

    const newVariant = await ProductVariants.create(productVariant);

    await Product.findByIdAndUpdate(_id, {
      $addToSet: { variantIds: newVariant._id },
    });

        sendResponse(res, 201,{success:true,message:'Product variant created success',data:newVariant})
  } catch (error) {
    console.error("Error occured while adding product variant");
    next(error);
  }
};

export { addVariant };
