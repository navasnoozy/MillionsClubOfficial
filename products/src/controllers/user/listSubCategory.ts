import { NextFunction, Request, Response } from "express";
import { Subcategory } from "../../models/subCategory";
import { sendResponse } from "@millionsclub/shared-libs/server";

const listSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategories = await Subcategory.find();

    sendResponse(res, 200, { success: true, data: subCategories });
  } catch (error) {
    console.log("Error occured while listing subcategories");
    next(error);
  }
};

export { listSubCategory };
