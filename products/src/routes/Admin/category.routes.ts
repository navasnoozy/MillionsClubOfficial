import { addCategorySchema, mongoIdValidationSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { addCategory } from "../../controllers/admin/category/add.category";
import { deletCategory } from "../../controllers/admin/category/delete.category";
import { updateCategory } from "../../controllers/admin/category/update.category";
import { Router } from "express";

const router = Router();

router.post("/api/products/category", require_admin, validateRequest(addCategorySchema), addCategory);

router.delete("/api/products/category/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), deletCategory);

router.patch("/api/products/category/:id", validateRequest(mongoIdValidationSchema, "params"), validateRequest(updateProductSchema), updateCategory);

export { router as categoryRoutes };
