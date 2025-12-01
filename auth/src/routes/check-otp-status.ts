// auth/src/routes/check-otp-status.ts
import express from "express";
import { checkOtpStatusController } from "../controllers/check-otp-status.controller";

const router = express.Router();

router.get("/api/users/otp-status", checkOtpStatusController);

export { router as checkOtpStatusRouter };
