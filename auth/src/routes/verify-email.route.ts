// auth/src/routes/verify-email.ts
import express from "express";
import { verifyEmailController } from "../controllers/verify-email.controller";

const router = express.Router();

router.post("/email", verifyEmailController);

export { router as verificationRoutes };
