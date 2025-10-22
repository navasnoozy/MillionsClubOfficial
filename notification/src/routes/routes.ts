// src/routes/otpRoutes.ts
import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rateLimiter";
import { checkOTPStatus, resendOTP, sendMail } from "../controllers/sendOtp";


const router = Router();

// Initial send (protected, with rate limiting)
router.post("/sendotp", requireAuth, otpSendLimiter, sendMail);

// Resend OTP (public, with stricter rate limiting)
router.post("/resendotp", otpResendLimiter, resendOTP);

// Check OTP status (public, no rate limit needed for read)
router.get("/status", checkOTPStatus);

export default router;
