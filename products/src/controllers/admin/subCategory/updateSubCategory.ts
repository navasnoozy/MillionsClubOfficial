import { NextFunction, Request, Response } from "express";
import { Subcategory } from "../../../models/subCategory";

const updateSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subCategoryId = req.params.id;
    const { name, slug } = req.body;

    const subcategory = await Subcategory.findById(subCategoryId);
    if (!subcategory) {
      res.status(404).json({ message: "Subcategory not found" });
      return;
    }

    // Check duplicate under same parent category
    if (name && name !== subcategory.name) {
      const existing = await Subcategory.findOne({
        name,
        parentCategoryId: subcategory.parentCategoryId,
        _id: { $ne: subCategoryId },
      });

      if (existing) {
        res
          .status(409)
          .json({
            message:
              "Subcategory with this name already exists under this category",
          });
        return;
      }
    }

    // Update fields
    if (name) subcategory.name = name;
    if (slug) subcategory.slug = slug;

    await subcategory.save();

    res
      .status(200)
      .json({ message: "Subcategory updated successfully", subcategory });
    return;
  } catch (error) {
    console.error("Error occurred while updating subcategory:", error);
    next(error);
  }
};

export { updateSubCategory };
