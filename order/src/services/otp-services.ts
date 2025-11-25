// src/services/otpService.ts
import { BadRequestError } from "@millionsclub/shared-libs/server";
import { sendGridMail } from "./send-grid-mail";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";
import generateSecureOTP from "../utils/generate-otp";
import { EmailOtp, IOtp } from "../models/otpModel";
import { OTP_CONFIG } from "../config/constants";
import {
  EmailVerifyParams,
  EmailVerifyResult,
} from "../interfaces/send-verification-mail";

interface CanSendOTP {
  (
    otpRecord: IOtp
  ): { allowed: boolean; reason?: string; cooldownSeconds?: number };
}

/**
 * Checks if OTP resend is allowed based on rate limits and expiry.
 */
export const canResendOTP: CanSendOTP = (otpRecord) => {
  const now = new Date();

  // If OTP expired, allow immediate resend and reset counters
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
    const timeSinceLastResend =
      (now.getTime() - otpRecord.lastResendAt.getTime()) / 1000;
    const cooldownSeconds = OTP_CONFIG.MIN_RESEND_INTERVAL_SECONDS;

    if (timeSinceLastResend < cooldownSeconds) {
      const remainingSeconds = Math.ceil(
        cooldownSeconds - timeSinceLastResend
      );
      return {
        allowed: false,
        reason: `Please wait ${remainingSeconds} seconds before requesting another OTP`,
        cooldownSeconds: remainingSeconds,
      };
    }
  }

  // Check hourly rate limit (if configured)
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

/**
 * Resends verification email for existing user.
 */
interface Resendmail {
  (params: EmailVerifyParams): Promise<EmailVerifyResult>;
}

export const resendVerificationEmail: Resendmail = async (params) => {
  try {
    const { email, userId } = params;

    if (!email && !userId) {
      throw new BadRequestError("Email or userId is required");
    }

    // Find OTP record
    const query = userId ? { userId } : { email };
    const otpRecord = await EmailOtp.findOne(query);

    if (!otpRecord) {
      // Do not reveal existence (security)
      return {
        success: false,
        message: "If an account exists, a verification email will be sent",
        errors: [
          { message: "If an account exists, a verification email will be sent" },
        ],
        canResend: false,
      };
    }

    // Check if resend allowed
    const resendCheck = canResendOTP(otpRecord);

    if (!resendCheck.allowed) {
      return {
        success: false,
        message:
          resendCheck.reason || "Cannot resend OTP at this time",
        errors: [
          { message: resendCheck.reason || "Cannot resend OTP at this time" },
        ],
        canResend: false,
        cooldownSeconds: resendCheck.cooldownSeconds,
      };
    }

    // Generate new OTP
    const newOTP = generateSecureOTP();
    const expiresAt = new Date(
      Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000
    );
    const now = new Date();

    // Resend counter logic
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const otpExpired = otpRecord.expiresAt < now;
    const hourPassed =
      otpRecord.lastResendAt && otpRecord.lastResendAt <= oneHourAgo;

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

    // Send email
    await sendGridMail({
      to: otpRecord.email,
      subject: "Millionsclub email verification",
      html: verifyOtpTemplate({
        name: otpRecord.name,
        otp: newOTP,
        expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
      canResend: false,
    };
  } catch (error) {
    console.error("Error in resendVerificationEmail:", {
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });

    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new BadRequestError("Failed to send verification email");
  }
};

/**
 * Gets OTP status for UI display (cooldown timer, etc.)
 */
interface GetOTPStatus {
  (email: string): Promise<{
    exists: boolean;
    expired: boolean;
    canResend: boolean;
    cooldownSeconds?: number;
    resendCount?: number;
  }>;
}

export const getOTPStatus: GetOTPStatus = async (email) => {
  try {
    const otpRecord = await EmailOtp.findOne({ email });

    if (!otpRecord) {
      return { exists: false, expired: false, canResend: false };
    }

    const now = new Date();
    const expired = otpRecord.expiresAt < now;

    if (expired) {
      return {
        exists: true,
        expired: true,
        canResend: true,
        resendCount: otpRecord.resendCount,
      };
    }

    const resendCheck = canResendOTP(otpRecord);

    return {
      exists: true,
      expired: false,
      canResend: resendCheck.allowed,
      cooldownSeconds: resendCheck.cooldownSeconds,
      resendCount: otpRecord.resendCount,
    };
  } catch (error) {
    console.error("Error in getOTPStatus:", {
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });

    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new BadRequestError("Failed to get OTP status");
  }
};

export const sendVerificationEmail = resendVerificationEmail;
