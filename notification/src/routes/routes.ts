
// =============================================
// src/routes/routes.ts
// =============================================
// Updated routes with resend endpoint

import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { sendMail, resendOTP, checkOTPStatus } from "../controllers/sendMail";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rateLimiter";

const router = Router();

// Initial send (protected, with rate limiting)
router.post("/sendmail", requireAuth, otpSendLimiter, sendMail);

// Resend OTP (public, with stricter rate limiting)
router.post("/resend-otp", otpResendLimiter, resendOTP);

// Check OTP status (public, no rate limit needed for read)
router.get("/otp-status", checkOTPStatus);

export default router;
