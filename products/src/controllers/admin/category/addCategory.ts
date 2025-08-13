import { NextFunction, Request, Response } from "express";
import { Category } from "../../../models/categoryModel";
import { BadRequestError } from "@millionsclub/shared-libs/server";

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCategory = req.body;

    const existingCategory = await Category.findOne({
      $or: [{ name: newCategory.name }, { slug: newCategory.slug }],
    });

    if (existingCategory) {
      let errorMsg = "";

      if (existingCategory.name === newCategory.name) {
        errorMsg += "Category name already exists. ";
      }

      if (existingCategory.slug === newCategory.slug) {
        errorMsg += "Category slug already exists.";
      }

      throw new BadRequestError(errorMsg.trim());
    }

    const savedCategory = await Category.create(req.body);

    res.status(201).send({ success: true, data: savedCategory });
  } catch (error) {
    console.error("Error occured while adding category");
    next(error);
  }
};

export { addCategory };
