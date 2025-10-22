// src/routes/otpRoutes.ts
import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rateLimiter";
import { checkOTPStatus, resendOTP, sendMail } from "../controllers/sendOtp";


const otpRouter = Router();

// Initial send (protected, with rate limiting)
otpRouter.post("/sendotp", requireAuth, otpSendLimiter, sendMail);

// Resend OTP (public, with stricter rate limiting)
otpRouter.post("/resendotp", otpResendLimiter, resendOTP);

// Check OTP status (public, no rate limit needed for read)
otpRouter.get("/status", checkOTPStatus);

export default otpRouter;
