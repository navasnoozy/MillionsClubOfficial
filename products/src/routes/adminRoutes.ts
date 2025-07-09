//products/src/routes/adminRoutes.ts
import { addProductSchema, addProductVariantSchema, mongoIdValidationSchema, updateProductSchema, validateRequest } from "@millionsclub/shared-libs";
import { Router } from "express";
import { addProduct } from "../controllers/admin/product/addProduct";
import { deleteProduct } from "../controllers/admin/product/deleteProduct";
import { updateProduct } from "../controllers/admin/product/updateProduct";
import { addVariant } from "../controllers/admin/productVariant/addVariant";
import { deleteVaraint } from "../controllers/admin/productVariant/deleteVariant";

const adminRouter = Router();

adminRouter.post(
  "/api/products/add",
  validateRequest(addProductSchema),
  addProduct
);

adminRouter.patch('/api/products/update/:id', validateRequest(updateProductSchema),validateRequest(mongoIdValidationSchema,'params'),updateProduct)
adminRouter.delete('/api/products/delete/:id',validateRequest(mongoIdValidationSchema,'params'), deleteProduct )
adminRouter.post('/api/products/:id/addvariant',validateRequest(addProductVariantSchema),validateRequest(mongoIdValidationSchema,'params'), addVariant )
adminRouter.patch('/api/products/variant/:id',validateRequest(mongoIdValidationSchema,'params'), addVariant )
adminRouter.delete('/api/products/variant/:id',validateRequest(mongoIdValidationSchema,'params'), deleteVaraint )


export default adminRouter