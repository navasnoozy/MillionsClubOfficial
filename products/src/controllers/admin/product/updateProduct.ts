import {
  BadRequestError,
  UpdateProductSchema,
} from "@millionsclub/shared-libs";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/productModel";
import { filterUndefined } from "../../../utils/filterUndefined";

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id
    const {
      title,
      brand,
      categoryId,
      subCategoryId,
      basePrice,
      description,
      isActive,
      variantIds,
    }: UpdateProductSchema = req.body;

    const existingProduct = await Product.findById(_id);

    if (!existingProduct) throw new BadRequestError("Product not found");

    const updateOperations = {
      ...filterUndefined({
        title,
        brand,
        categoryId,
        subCategoryId,
        basePrice,
        description,
        isActive,
      }),
      ...(variantIds?.length && {
        $addToSet: { variantIds: { $each: variantIds } },
      }),
    };

    await Product.findByIdAndUpdate(_id, updateOperations);

    res.status(200).send({ success: true });

    return;
  } catch (error) {
    console.error("Error occurred while updating product", error);
    next(error);
  }
};

export { updateProduct };
