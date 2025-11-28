import { addProductSchema, mongoIdValidationSchema, require_admin, updateProductSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { addProduct } from "../../controllers/admin/product/add.product";
import { deleteProduct } from "../../controllers/admin/product/delete.product";
import { updateProduct } from "../../controllers/admin/product/update.product";

const router = Router();

router.post("/api/products", require_admin, validateRequest(addProductSchema), addProduct);

router.patch("/api/products/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), validateRequest(updateProductSchema), updateProduct);

router.delete("/api/products/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), deleteProduct);

export { router as productRoutes };
