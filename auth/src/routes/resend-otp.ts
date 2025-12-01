// auth/src/routes/resend-otp.ts
import express from "express";
import { resendOtpController } from "../controllers/resend-otp.controller";

const router = express.Router();

router.post("/api/users/resend-otp", resendOtpController);

export { router as resendOtpRouter };
