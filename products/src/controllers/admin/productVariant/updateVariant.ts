import { NextFunction, Request, Response } from "express";
import { ProductVariants } from "../../../models/productVariantModel";
import { filterUndefined } from "../../../utils/filterUndefined";
import { BadRequestError } from "@millionsclub/shared-libs";

const updateVariant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    const updateData = filterUndefined(req.body);

    const updatedVariant = await ProductVariants.findByIdAndUpdate(
      _id,
      updateData
    );

    if (!updatedVariant) throw new BadRequestError("Product variant not found");

    res.status(200).send({ success: true, data: updateVariant });
  } catch (error) {
    console.error("Error occured while updating product variant");
    next(error);
  }
};

export { updateVariant };
