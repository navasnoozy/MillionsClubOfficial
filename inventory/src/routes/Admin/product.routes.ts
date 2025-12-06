import { createProductSchema, idSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { Router } from "express";

import { deleteProduct } from "../../controllers/admin/product/delete.product";
import { updateProduct } from "../../controllers/admin/product/update.product";
import { createProduct } from "../../controllers/admin/product/create.product";

const router = Router();

router.post("/products", validateRequest(createProductSchema), createProduct);

router.patch("/products/:id", validateRequest(idSchema, "params"), validateRequest(updateProductSchema), updateProduct);

router.delete("/products/:id",  validateRequest(idSchema, "params"), deleteProduct);

export { router as productRoutes };
