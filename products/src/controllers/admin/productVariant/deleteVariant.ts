import { NextFunction, Request, Response } from "express";
import { ProductVariants } from "../../../models/productVariantModel";
import { BadRequestError } from "@millionsclub/shared-libs";

const deleteVaraint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    const deletedVariant = await ProductVariants.findByIdAndDelete(_id);
    //Mongoose middleware will update /delete variant id from products

    if (!deletedVariant) throw new BadRequestError("Product variant not found");

    res.status(200).send({ success: true });
  } catch (error) {
    console.error("Error occured while deleting product variant");
    next(error);
  }
};

export { deleteVaraint };
