//products/src/routes/adminRoutes.ts
import { Router } from "express";
import { addProductSchema, updateProductSchema, validateRequest } from "@millionsclub/shared-libs";
import { addProduct } from "../controllers/admin/product/addProduct";
import { updateProduct } from "../controllers/admin/product/updateProduct";
import { listProducts } from "../controllers/user/listProducts";
import { deleteProduct } from "../controllers/admin/product/deleteProduct";

const adminRouter = Router();

adminRouter.post(
  "/api/products/addproduct",
  validateRequest(addProductSchema),
  addProduct
);

adminRouter.patch('/api/products/updateproduct', validateRequest(updateProductSchema),updateProduct)
adminRouter.get('/api/products/listproducts', deleteProduct )


export default adminRouter