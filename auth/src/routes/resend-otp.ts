// auth/src/routes/resend-otp.ts
import express from "express";
import { resendOtpController } from "../controllers/resend-otp.controller";
import { otpResendLimiter } from "../middleware/rate-limiter";

const router = express.Router();

router.post("/api/users/resend-otp", otpResendLimiter, resendOtpController);

export { router as resendOtpRouter };
    