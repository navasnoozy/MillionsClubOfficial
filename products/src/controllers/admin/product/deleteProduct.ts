import { BadRequestError } from "@millionsclub/shared-libs/server";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/productModel";

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.id;

    if (!_id) throw new BadRequestError("Please provide product id");

    const product = await Product.findByIdAndDelete(_id);

    if (!product) throw new BadRequestError("No product found");

    res.status(200).send({ success: true, data: product });
    return;
  } catch (error) {
    console.error("Error occured while fetching product");
    next(error);
  }
};

export { deleteProduct };
