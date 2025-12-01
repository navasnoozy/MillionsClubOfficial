// auth/src/routes/signin.ts
import express from "express";
import { signinSchema, validateRequest } from "@millionsclub/shared-libs/server";
import { signinController } from "../controllers/signin.controller";

const router = express.Router();

router.post("/api/users/signin", validateRequest(signinSchema), signinController);

export { router as signinRouter };

