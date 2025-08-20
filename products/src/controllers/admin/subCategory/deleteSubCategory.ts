import { NextFunction, Request, Response } from "express";
import { Subcategory } from "../../../models/subCategory";
import { sendResponse } from "@millionsclub/shared-libs/server";

const deleteSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategoryId = req.params.id;

    const deleted = await Subcategory.findByIdAndDelete(subCategoryId);
    if (!deleted) {
      res.status(404).json({ message: "Subcategory not found" });
      return;
    }

    // Cleanup handled by post hook in model
     sendResponse(res, 200,{success:true})
    return;
  } catch (error) {
    console.error("Error occurred while deleting subcategory:", error);
    next(error);
  }
};

export { deleteSubCategory };
