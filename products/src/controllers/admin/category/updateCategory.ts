import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/categoryModel";

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.id;
    const { name, slug } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Check for duplicate name or slug in other categories
    if (name) {
      const existingByName = await Category.findOne({
        name,
        _id: { $ne: categoryId },
      });
      if (existingByName) {
        res.status(409).json({ message: "Category name already exists" });
        return;
      }
    }

    if (slug) {
      const existingBySlug = await Category.findOne({
        slug,
        _id: { $ne: categoryId },
      });
      if (existingBySlug) {
        res.status(409).json({ message: "Slug already exists" });
        return;
      }
    }

    // Update the category fields
    if (name) category.name = name;
    if (slug) category.slug = slug;

    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
       return
  } catch (error) {
    console.error("Error occurred while updating category:", error);
    next(error);
  }
};

export { updateCategory };
