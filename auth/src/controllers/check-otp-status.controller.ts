// auth/src/controllers/check-otp-status.controller.ts
import { Request, Response } from "express";
import { sendResponse } from "@millionsclub/shared-libs/server";
import { EmailOtp } from "../models/otpModel";
import { OTP_CONFIG } from "../config/constants";

// Helper function to check if resend is allowed
const canResendOTP = (otpRecord: any) => {
  const now = new Date();

  if (otpRecord.expiresAt < now) {
    return { allowed: true };
  }

  if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_TOTAL) {
    return { allowed: false };
  }

  if (otpRecord.lastResendAt) {
    const timeSinceLastResend = (now.getTime() - otpRecord.lastResendAt.getTime()) / 1000;
    const cooldownSeconds = OTP_CONFIG.MIN_RESEND_INTERVAL_SECONDS;

    if (timeSinceLastResend < cooldownSeconds) {
      const remainingSeconds = Math.ceil(cooldownSeconds - timeSinceLastResend);
      return {
        allowed: false,
        cooldownSeconds: remainingSeconds,
      };
    }
  }

  if (OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (otpRecord.lastResendAt && otpRecord.lastResendAt > oneHourAgo) {
      if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
        return { allowed: false };
      }
    }
  }

  return { allowed: true };
};

export const checkOtpStatusController = async (req: Request, res: Response) => {
  const { email } = req.query;

  if (!email || typeof email !== "string") {
    return sendResponse(res, 400, {
      success: false,
      message: "Email is required",
    });
  }

  const otpRecord = await EmailOtp.findOne({ email });

  if (!otpRecord) {
    return sendResponse(res, 200, {
      success: true,
      data: {
        exists: false,
        expired: false,
        canResend: false,
      },
    });
  }

  const now = new Date();
  const expired = otpRecord.expiresAt < now;

  if (expired) {
    return sendResponse(res, 200, {
      success: true,
      data: {
        exists: true,
        expired: true,
        canResend: true,
        resendCount: otpRecord.resendCount,
      },
    });
  }

  const resendCheck = canResendOTP(otpRecord);

  return sendResponse(res, 200, {
    success: true,
    data: {
      exists: true,
      expired: false,
      canResend: resendCheck.allowed,
      cooldownSeconds: resendCheck.cooldownSeconds,
      resendCount: otpRecord.resendCount,
    },
  });
};
