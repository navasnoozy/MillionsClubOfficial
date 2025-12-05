import {  createCategorySchema, idSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { addCategory } from "../../controllers/admin/category/add.category";
import { deletCategory } from "../../controllers/admin/category/delete.category";
import { updateCategory } from "../../controllers/admin/category/update.category";
import { Router } from "express";

const router = Router();

router.post("/categories",  validateRequest(createCategorySchema), addCategory);

router.delete("/categories/:id",  validateRequest(idSchema, "params"), deletCategory);

router.patch("/categories/:id", validateRequest(idSchema, "params"), validateRequest(updateProductSchema), updateCategory);

export { router as categoryRoutes };
