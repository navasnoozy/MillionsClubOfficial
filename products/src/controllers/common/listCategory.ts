import { NextFunction, Request, Response } from "express";
import { Category } from "../../models/categoryModel";
import { sendResponse } from "@millionsclub/shared-libs/server";

const listCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().populate("subcategories");

    sendResponse(res, 200, { success: true, data: categories });
  } catch (error) {
    console.log("Error occured while listing categories ", error);
    next(error);
  }
};

export { listCategory };
