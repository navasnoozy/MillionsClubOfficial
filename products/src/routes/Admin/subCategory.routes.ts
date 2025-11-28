import { addSubCategorySchema, mongoIdValidationSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { addSubCategory } from "../../controllers/admin/subCategory/add.subCategory";
import { deleteSubCategory } from "../../controllers/admin/subCategory/delete.subCategory";
import { updateSubCategory } from "../../controllers/admin/subCategory/update.subCategory";
import { Router } from "express";

const router = Router();

router.post("/api/products/subcategory/:id", require_admin, validateRequest(addSubCategorySchema), addSubCategory);

router.delete("/api/products/subcategory/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), deleteSubCategory);

router.patch("/api/products/subcategory/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), validateRequest(updateProductSchema), updateSubCategory);

export { router as subCategoryRouter };
