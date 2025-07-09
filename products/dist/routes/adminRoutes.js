//products/src/routes/adminRoutes.ts
import { addProductSchema, updateProductSchema, validateRequest } from "@millionsclub/shared-libs";
import { Router } from "express";
import { addProduct } from "../controllers/admin/product/addProduct";
import { deleteProduct } from "../controllers/admin/product/deleteProduct";
import { updateProduct } from "../controllers/admin/product/updateProduct";
const adminRouter = Router();
adminRouter.post("/api/products/add", validateRequest(addProductSchema), addProduct);
adminRouter.patch('/api/products/update/:id', validateRequest(updateProductSchema), updateProduct);
adminRouter.delete('/api/products/delete/:id', deleteProduct);
export default adminRouter;
