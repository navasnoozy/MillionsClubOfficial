import { NextFunction, Request, Response } from "express";
import { ProductVariants } from "../../../models/productVariantModel";
import { filterOutEmpty } from "../../../utils/filter-out-empty";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { publish_product_variant_updated } from "../../../events/publishers/product-variant-updated";

const updateVariant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;

    const updateData = filterOutEmpty(req.body);

    const updated = await ProductVariants.findByIdAndUpdate(_id, updateData);

    if (!updated) throw new BadRequestError("Product variant not found");

    publish_product_variant_updated({
      variantId: updated._id.toString(),
      size: updated.size,
      price: updated.price,
      quantity: updated.quantity,
      isActive: updated.isActive!,
    });

    sendResponse(res, 201, { success: true, message: "Product variant update success", data: updated });
  } catch (error) {
    console.error("Error occured while updating product variant");
    next(error);
  }
};

export { updateVariant };
