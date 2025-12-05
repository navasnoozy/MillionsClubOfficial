import { createSubCategorySchema, idSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { addSubCategory } from "../../controllers/admin/subCategory/add.subCategory";
import { deleteSubCategory } from "../../controllers/admin/subCategory/delete.subCategory";
import { updateSubCategory } from "../../controllers/admin/subCategory/update.subCategory";
import { Router } from "express";

const router = Router();

router.post("/subcategory/:id", validateRequest(idSchema, "params"), validateRequest(createSubCategorySchema), addSubCategory);

router.delete("/subcategory/:id", validateRequest(idSchema, "params"), deleteSubCategory);

router.patch("/subcategory/:id", validateRequest(idSchema, "params"), validateRequest(updateProductSchema), updateSubCategory);

export { router as subCategoryRouter };
