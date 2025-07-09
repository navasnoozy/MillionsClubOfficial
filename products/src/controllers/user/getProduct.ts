import { BadRequestError } from "@millionsclub/shared-libs";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/productModel";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.query.id;

    if (_id) throw new BadRequestError("Please provide product id");

    const product = Product.findById(_id);

    if (!product) throw new BadRequestError("No product found");

    res.status(404).send({ success: true, data: product });
    return;
  } catch (error) {
    console.error("Error occured while fetching product");
    next(error);
  }
};

export { getProduct };
