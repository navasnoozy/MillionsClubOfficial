import { NextFunction, Request, Response } from "express";
import { Category } from "../../../models/categoryModel";
import { Subcategory } from "../../../models/subCategory";


const addSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug, parentCategoryId } = req.body;

    const category = await Category.findById(parentCategoryId);
    if (!category) {
       res.status(404).json({ message: "Parent category not found" });
       return
    }

    // Check for existing subcategory under this parent with same name
    const existing = await Subcategory.findOne({ name, parentCategoryId });
    if (existing) {
      res.status(409).json({ message: "Subcategory with this name already exists under this category" });
       return
    }

    // Create subcategory
    const subcategory = await Subcategory.create({
      name,
      slug,
      parentCategoryId
    });

    // Push subcategory ID into parent category
    category.subcategories.push(subcategory._id);
    await category.save();

   res.status(201).json({ message: "Subcategory created successfully", subcategory });
     return
  } catch (error) {
    console.error("Error occurred while adding addSubCategory:", error);
    next(error);
  }
};

export { addSubCategory };