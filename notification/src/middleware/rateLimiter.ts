// src/middleware/rateLimiter.ts

import rateLimit from "express-rate-limit";

export const otpResendLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requests per IP per window
  message: {
    success: false,
    message: "Too many resend requests from this IP. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Stricter rate limiter for initial OTP send
 */
export const otpSendLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Max 20 requests per IP per hour
  message: {
    success: false,
    message: "Too many OTP requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
