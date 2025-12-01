// auth/src/controllers/resend-otp.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { EmailOtp } from "../models/otpModel";
import generateSecureOTP from "../utils/generate-otp";
import { OTP_CONFIG } from "../config/constants";
import { publish_user_created } from "../events/publishers/user-created";

// Helper function to check if resend is allowed
const canResendOTP = (otpRecord: any) => {
  const now = new Date();

  // If OTP expired, allow immediate resend
  if (otpRecord.expiresAt < now) {
    return { allowed: true };
  }

  // Check total resend attempts
  if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_TOTAL) {
    return {
      allowed: false,
      reason: "Maximum resend attempts reached. Please register again.",
    };
  }

  // Check cooldown period
  if (otpRecord.lastResendAt) {
    const timeSinceLastResend = (now.getTime() - otpRecord.lastResendAt.getTime()) / 1000;
    const cooldownSeconds = OTP_CONFIG.MIN_RESEND_INTERVAL_SECONDS;

    if (timeSinceLastResend < cooldownSeconds) {
      const remainingSeconds = Math.ceil(cooldownSeconds - timeSinceLastResend);
      return {
        allowed: false,
        reason: `Please wait ${remainingSeconds} seconds before requesting another OTP`,
        cooldownSeconds: remainingSeconds,
      };
    }
  }

  // Check hourly rate limit
  if (OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (otpRecord.lastResendAt && otpRecord.lastResendAt > oneHourAgo) {
      if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
        return {
          allowed: false,
          reason: "Too many resend attempts. Please try again in an hour.",
        };
      }
    }
  }

  return { allowed: true };
};

export const resendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  // Find OTP record
  const otpRecord = await EmailOtp.findOne({ email });

  if (!otpRecord) {
    throw new BadRequestError("No OTP found for this email. Please register first.");
  }

  // Check if resend allowed
  const resendCheck = canResendOTP(otpRecord);

  if (!resendCheck.allowed) {
    const message = resendCheck.cooldownSeconds ? `Please wait ${resendCheck.cooldownSeconds} seconds before requesting another OTP` : resendCheck.reason || `Cannot resend OTP at this time`;

    throw new BadRequestError(message);
  }

  // Generate new OTP
  const newOTP = generateSecureOTP();
  const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
  const now = new Date();

  // Resend counter logic
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const otpExpired = otpRecord.expiresAt < now;
  const hourPassed = otpRecord.lastResendAt && otpRecord.lastResendAt <= oneHourAgo;

  if (otpExpired || hourPassed) {
    otpRecord.resendCount = 1;
  } else {
    otpRecord.resendCount += 1;
  }

  // Update record
  otpRecord.otp = newOTP;
  otpRecord.expiresAt = expiresAt;
  otpRecord.lastResendAt = now;
  await otpRecord.save();

  await publish_user_created({
    userId: otpRecord.userId,
    name: otpRecord.name,
    email: otpRecord.email,
    role: otpRecord.role || "user",
    otp: newOTP,
  });

  sendResponse(res, 200, {
    success: true,
    message: "A new OTP has been sent",
    data: { resendCount: otpRecord.resendCount },
  });
  return;
};
