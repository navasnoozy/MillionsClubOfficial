import { createProductVariantSchema, idSchema, require_admin, validateRequest } from "@millionsclub/shared-libs/server";
import { addVariant } from "../../controllers/admin/productVariant/add.variant";
import { deleteVaraint } from "../../controllers/admin/productVariant/delete.variant";
import { updateVariant } from "../../controllers/admin/productVariant/update.variant";
import { Router } from "express";

const router = Router();

router.post("/products/variant/:id", require_admin, validateRequest(idSchema, "params"), validateRequest(createProductVariantSchema), addVariant);

router.patch("/products/variant/:id", require_admin, validateRequest(idSchema, "params"), updateVariant);

router.delete("/products/variant/:id", require_admin, validateRequest(idSchema, "params"), deleteVaraint);

export { router as productVariantRoutes };
