import { BadRequestError, sendResponse, UpdateProductSchema } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/productModel";
import { filterOutEmpty } from "../../../utils/filter-out-empty";
import { publish_product_updated } from "../../../events/publishers/product_updated";

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;
    const { title, brand, categoryId, subCategoryId, basePrice, description, isActive }: UpdateProductSchema = req.body;

    const existingProduct = await Product.findById(_id);

    if (!existingProduct) throw new BadRequestError("Product not found");

    const updateOperations = {
      ...filterOutEmpty({
        title,
        brand,
        categoryId,
        subCategoryId,
        basePrice,
        description,
        isActive,
      }),
    };

    const updated = await Product.findByIdAndUpdate(_id, updateOperations, { new: true });

    if (updated) {
      publish_product_updated({
        productId: updated._id.toString(),
        title: updated.title,
        basePrice: updated.basePrice ?? undefined,
        isActive: updated.isActive,
      });
    }

    sendResponse(res, 200, { success: true, message: "Product updation success" });

    return;
  } catch (error) {
    console.error("Error occurred while updating product", error);
    next(error);
  }
};

export { updateProduct };
