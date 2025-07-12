import { Request, Response, NextFunction } from "express";
import { Category } from "../../../models/categoryModel";



const deletCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.params.id;

    // 1. Find the category
    const category = await Category.findById(categoryId);
    if (!category) {
       res.status(404).send({ message: "Category not found" });
       return
    }




    await Category.findByIdAndDelete(categoryId);

   res.status(200).json({ message: "Category and related subcategories deleted successfully" });
   return
  } catch (error) {
    console.error("Error occurred while deleting category:", error);
    next(error);
  }
};

export { deletCategory };
