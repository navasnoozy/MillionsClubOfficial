// auth/src/routes/signup.ts
import express from "express";
import { validateRequest, signupSchema } from "@millionsclub/shared-libs/server";
import { signupController } from "../controllers/signup.controller";

const signupRouter = express.Router();
signupRouter.post("/api/users/signup", validateRequest(signupSchema), signupController);

export { signupRouter };

