import { NextFunction, Request, Response } from "express";
import { sendResponse } from "@millionsclub/shared-libs/server";
import { Subcategory } from "../models/subCategory";

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
