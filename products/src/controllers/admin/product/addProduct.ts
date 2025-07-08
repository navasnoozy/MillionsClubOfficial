// products/src/controllers/admin/product/addProduct.ts
import { AddProductSchema, BadRequestError } from "@millionsclub/shared-libs";
import { NextFunction, Request, Response } from "express";
import { Product } from "../../../models/productModel";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      brand,
      categoryId,
      subCategoryId,
      basePrice,
      description,
      isActive,
    }: AddProductSchema = req.body;

    const existingProduct = await Product.findOne({ title: title });

    if (existingProduct) {
      throw new BadRequestError("Product already exist", "title");
    }

    const newProductData: AddProductSchema = {
      title,
      brand,
      categoryId,
      subCategoryId,
      basePrice,
      description,
      isActive,
    };

     const newProduct = await Product.create(newProductData);

     res.status(201).send({success:true, data:newProduct })

  } catch (error) {
    console.log("Error while adding product", error);
    next(error)
  }
};

export { addProduct };
