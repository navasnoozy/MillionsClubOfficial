import { validateRequest } from "@millionsclub/shared-libs/server";
import express from "express";

const router = express.Router();

router.get("/users", validateRequest());
router.patch("/users/:id");
router.delete("/users/:id");

export { router as adminRoutes };
