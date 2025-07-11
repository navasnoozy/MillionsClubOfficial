//products/src/routes/adminRoutes.ts
import {
  addProductSchema,
  addProductVariantSchema,
  mongoIdValidationSchema,
  updateProductSchema,
  validateRequest,
} from "@millionsclub/shared-libs";
import { Router } from "express";
import { addProduct } from "../controllers/admin/product/addProduct";
import { deleteProduct } from "../controllers/admin/product/deleteProduct";
import { updateProduct } from "../controllers/admin/product/updateProduct";
import { addVariant } from "../controllers/admin/productVariant/addVariant";
import { deleteVaraint } from "../controllers/admin/productVariant/deleteVariant";
import { updateVariant } from "../controllers/admin/productVariant/updateVariant";

const adminRouter = Router();

// PRODUCT /////
adminRouter.post(
  "/api/products/add",
  validateRequest(addProductSchema),
  addProduct
);

adminRouter.patch(
  "/api/products/update/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),

  updateProduct
);
adminRouter.delete(
  "/api/products/delete/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  deleteProduct
);
adminRouter.post(
  "/api/products/:id/addvariant",
  validateRequest(mongoIdValidationSchema),
  validateRequest(addProductVariantSchema),
  addVariant
);
adminRouter.patch(
  "/api/products/variant/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  updateVariant
);

// VARIANT /////
adminRouter.delete(
  "/api/products/variant/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  deleteVaraint
);

export default adminRouter;
