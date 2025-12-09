//auth/src/routes/admin.routes.ts
import { createUserSchema, idSchema, paginationSchema, updateUserSchema, validateRequest } from "@millionsclub/shared-libs/server";
import express from "express";
import { deleteUser } from "../controllers/admin/delete-user";
import { getUsers } from "../controllers/admin/get-users";
import { updateUser } from "../controllers/admin/update-user";
import { createUser } from "../controllers/admin/create-user";

const router = express.Router();

router.get("/users", validateRequest(paginationSchema, "query"), getUsers as any);
router.patch("/users/:id", validateRequest(idSchema, "params"), validateRequest(updateUserSchema), updateUser as any);
router.delete("/users/:id", validateRequest(idSchema, "params"), deleteUser as any);
router.post("/users", validateRequest(createUserSchema), createUser as any);

export { router as adminRoutes };
