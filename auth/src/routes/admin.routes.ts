import { paginationSchema, validateRequest } from "@millionsclub/shared-libs/server";
import express from "express";
import { getUsers } from "../controllers/admin/get-users";

const router = express.Router();

router.get("/users", validateRequest(paginationSchema, "query"), getUsers as any);
// router.patch("/users/:id");
// router.delete("/users/:id");

export { router as adminRoutes };
