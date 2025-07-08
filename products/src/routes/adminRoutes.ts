//products/src/routes/adminRoutes.ts
import { Router } from "express";
import { addProductSchema, validateRequest } from "@millionsclub/shared-libs";
import { addProduct } from "../controllers/admin/product/addProduct";

const router = Router();

router.post(
  "/api/products/addproduct",
  validateRequest(addProductSchema),
  addProduct
);

router.patch('/api/products/updateproduct', validateRequest(addProductSchema),)


export { router as adminRouter}