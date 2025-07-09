import { BadRequestError } from "@millionsclub/shared-libs";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/productModel";
import mongoose from "mongoose";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.id;

    if (!_id) throw new BadRequestError("Please provide product id");

    

    const product = await Product.findById(_id);

    if (!product){
      throw new BadRequestError ('Product not found')
    }

    res.status(404).send({ success: true, data: product });
    return;
  } catch (error) {
    console.error("Error occured while fetching a product",error);
    next(error);
  }
};

export { getProduct };
