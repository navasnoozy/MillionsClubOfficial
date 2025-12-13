import { 
  createProductSchema, 
  idSchema, 
  require_admin, 
  updateProductSchema, 
  validateRequest,
  productQuerySchema 
} from "@millionsclub/shared-libs/server";
import { Router } from "express";

import { deleteProduct } from "../../controllers/admin/product/delete.product";
import { updateProduct } from "../../controllers/admin/product/update.product";
import { createProduct } from "../../controllers/admin/product/create.product";
import { getProduct } from "../../controllers/admin/product/get.product";
import { getProducts } from "../../controllers/admin/product/get.products";

const router = Router();

router.get("/product/:id", validateRequest(idSchema, "params"), getProduct as any);
router.get("/products", validateRequest(productQuerySchema, "query"), getProducts as any);
router.post("/products", validateRequest(createProductSchema), createProduct);

router.patch("/products/:id", validateRequest(idSchema, "params"), validateRequest(updateProductSchema), updateProduct);

router.delete("/products/:id", validateRequest(idSchema, "params"), deleteProduct);

export { router as productRoutes };

