import { addProductVariantSchema, mongoIdValidationSchema, require_admin, validateRequest } from "@millionsclub/shared-libs/server";
import { addVariant } from "../../controllers/admin/productVariant/add.variant";
import { deleteVaraint } from "../../controllers/admin/productVariant/delete.variant";
import { updateVariant } from "../../controllers/admin/productVariant/update.variant";
import { Router } from "express";

const router = Router();

router.post("/api/products/variant/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), validateRequest(addProductVariantSchema), addVariant);

router.patch("/api/products/variant/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), updateVariant);

router.delete("/api/products/variant/:id", require_admin, validateRequest(mongoIdValidationSchema, "params"), deleteVaraint);

export { router as productVariantRoutes };
