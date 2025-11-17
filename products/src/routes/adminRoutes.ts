//products/src/routes/adminRoutes.ts
import {
  addCategorySchema,
  addProductSchema,
  addProductVariantSchema,
  addSubCategorySchema,
  mongoIdValidationSchema,
  require_admin,
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
////////////////
// PRODUCT /////
////////////////
adminRouter.post(
  "/api/products/add",require_admin,
  validateRequest(addProductSchema),
  addProduct
);

adminRouter.patch(
  "/api/products/update/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),
  updateProduct
);
adminRouter.delete(
  "/api/products/delete/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  deleteProduct
);




////////////////
// VARIANT /////
///////////////
adminRouter.post(
  "/api/products/:id/addvariant",require_admin,
  validateRequest(mongoIdValidationSchema,'params'),
  validateRequest(addProductVariantSchema),
  addVariant
);
adminRouter.patch(
  "/api/products/variant/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  updateVariant
);

adminRouter.delete(
  "/api/products/variant/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  deleteVaraint
);


//////////////////
// CATEGORY //////
/////////////////////////////////////////////////////////////
adminRouter.post(
  "/api/products/category/add",require_admin,
  validateRequest(addCategorySchema),
  addCategory
);

adminRouter.delete(
  "/api/products/category/delete/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  deletCategory
);

adminRouter.patch(
  "/api/products/category/update/:id",
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),
  updateCategory
);

////////////////////////
// SUB - CATEGORY //////
//////////////////////////////////////////////////////////
adminRouter.post(
  "/api/products/subcategory/add",require_admin,
  validateRequest(addSubCategorySchema),
  addSubCategory
);

adminRouter.delete(
  "/api/products/subcategory/delete/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  deleteSubCategory
);

adminRouter.patch(
  "/api/products/subcategory/update/:id",require_admin,
  validateRequest(mongoIdValidationSchema, "params"),
  validateRequest(updateProductSchema),
  updateSubCategory
);

export default adminRouter;
