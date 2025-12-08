// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";
import { sendResponse } from "@millionsclub/shared-libs/server";

export const otpResendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requests per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    sendResponse(res, 429, {
      success: false,
      message: "Too many resend requests from this IP. Please try again later.",
    });
  },
});


export const otpSendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Max 20 requests per IP per hour
  standardHeaders: true,
  legacyHeaders: false,
  
  handler: (req, res) => {
    sendResponse(res, 429, {
      success: false,
      message: "Too many OTP requests. Please try again later.",
    });
  },
});