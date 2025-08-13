//products/src/routes/adminRoutes.ts
import {
  addCategorySchema,
  addProductSchema,
  addProductVariantSchema,
  addSubCategorySchema,
  mongoIdValidationSchema,
  updateProductSchema,
  validateRequest,
} from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { addProduct } from "../controllers/admin/product/addProduct";
import { deleteProduct } from "../controllers/admin/product/deleteProduct";
import { updateProduct } from "../controllers/admin/product/updateProduct";
import { addVariant } from "../controllers/admin/productVariant/addVariant";
import { deleteVaraint } from "../controllers/admin/productVariant/deleteVariant";
import { updateVariant } from "../controllers/admin/productVariant/updateVariant";
import { addCategory } from "../controllers/admin/category/addCategory";
import { deletCategory } from "../controllers/admin/category/deleteCategory";
import { updateCategory } from "../controllers/admin/category/updateCategory";
import { addSubCategory } from "../controllers/admin/subCategory/addSubCategory";
import { deleteSubCategory } from "../controllers/admin/subCategory/deleteSubCategory";
import { updateSubCategory } from "../controllers/admin/subCategory/updateSubCategory";

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

// VARIANT /////
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

adminRouter.delete(
  "/api/products/variant/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  deleteVaraint
);

// CATEGORY //////
adminRouter.post(
  "/api/products/category/add",
  validateRequest(addCategorySchema),
  addCategory
);

adminRouter.delete(
  "/api/products/category/delete/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  deletCategory
);

adminRouter.patch(
  "/api/products/category/update/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),
  updateCategory
);

// SUB - CATEGORY //////
adminRouter.post(
  "/api/products/subcategory/:id/add",
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(addSubCategorySchema),
  addSubCategory
);

adminRouter.delete(
  "/api/products/subcategory/delete/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  deleteSubCategory
);

adminRouter.patch(
  "/api/products/subcategory/update/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),
  updateSubCategory
);

export default adminRouter;
