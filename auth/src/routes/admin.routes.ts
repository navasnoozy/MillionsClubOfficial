//auth/src/routes/admin.routes.ts
import { idSchema, paginationSchema, validateRequest } from "@millionsclub/shared-libs/server";
import express from "express";
import { getUsers } from "../controllers/admin/get-users";

const router = express.Router();

router.get("/users", validateRequest(paginationSchema, "query"), getUsers as any);
router.patch("/users/:id", validateRequest(idSchema, "query"), getUsers as any);
router.delete("/users/:id", validateRequest(idSchema, "query"), getUsers as any);
router.delete("/users/:id", validateRequest(idSchema, "query"), getUsers as any);


export { router as adminRoutes };
