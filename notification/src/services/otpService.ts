// src/services/otpService.ts
import { BadRequestError } from "@millionsclub/shared-libs/server";
import { sendGridMail } from "./sendGridMail";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";
import generateSecureOTP from "../utils/generateSecureOTP";
import { Otp, IOtp } from "../models/otpModel";
import { OTP_CONFIG } from "../config/constants";
import { EmailVerifyParams, EmailVerifyResult } from "../interfaces/SendVerificationEmail";

/**
 * Checks if OTP resend is allowed based on rate limits and expiry.
 */
const canResendOTP = (otpRecord: IOtp): {
  allowed: boolean;
  reason?: string;
  cooldownSeconds?: number;
} => {
  const now = new Date();

  if (otpRecord.expiresAt < now) {
    return { allowed: true };
  }

  if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_TOTAL) {
    return {
      allowed: false,
      reason: "Maximum resend attempts reached. Please register again.",
    };
  }

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

  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  if (otpRecord.lastResendAt && otpRecord.lastResendAt > oneHourAgo) {
    if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
      return {
        allowed: false,
        reason: "Too many resend attempts. Please try again later.",
      };
    }
  }

  return { allowed: true };
};

/**
 * Creates and sends initial OTP for new user (from Kafka event).
 * Upserts the record with resendCount: 0.
 */
export const createAndSendInitialOtp = async (
  userId: string,
  email: string,
  name: string
): Promise<EmailVerifyResult> => {
  try {
    const otp = generateSecureOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);

    await Otp.findOneAndUpdate(
      { userId },
      {
        name,
        userId,
        email,
        otp,
        expiresAt,
        resendCount: 0,
        lastResendAt: new Date(),
      },
      { upsert: true, new: true }
    );

    await sendGridMail({
      to: email,
      subject: "Millionsclub email verification",
      html: verifyOtpTemplate({
        name,
        otp,
        expiryMinutes: OTP_CONFIG.EXPIRY_MINUTES,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
      canResend: true,
    };
  } catch (error) {
    console.error("Error in createAndSendInitialOtp service:", error);
    throw new BadRequestError("Failed to create and send initial OTP");
  }
};

/**
 * Sends or resends verification email.
 * For initial send, uses userId if provided; falls back to email.
 * Performs resend checks if record exists.
 */
export const sendVerificationEmail = async (
  params: EmailVerifyParams
): Promise<EmailVerifyResult> => {
  try {
    const { email, userId } = params;

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    const query = userId ? { userId } : { email };
    const otpRecord = await Otp.findOne(query);

    if (!otpRecord) {
      throw new BadRequestError("User record not found");
    }

    let isResend = otpRecord.otp > 0;
    if (isResend) {
      const resendCheck = canResendOTP(otpRecord);

      if (!resendCheck.allowed) {
        return {
          success: false,
          message: resendCheck.reason || "Cannot resend OTP at this time",
          canResend: false,
          cooldownSeconds: resendCheck.cooldownSeconds,
        };
      }
    }

    const newOTP = generateSecureOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);

    otpRecord.otp = newOTP;
    otpRecord.expiresAt = expiresAt;
    if (isResend) {
      otpRecord.resendCount += 1;
      otpRecord.lastResendAt = new Date();
    }
    await otpRecord.save();

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
      canResend: true,
    };
  } catch (error) {
    console.error("Error in sendVerificationEmail service:", error);
    throw new BadRequestError("Failed to send verification email");
  }
};

/**
 * Retrieves OTP status for an email.
 */
export const getOTPStatus = async (
  email: string
): Promise<{
  exists: boolean;
  expired: boolean;
  canResend: boolean;
  cooldownSeconds?: number;
  resendCount?: number;
}> => {
  try {
    const otpRecord = await Otp.findOne({ email });

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
    console.error("Error in getOTPStatus:", error);
    throw new BadRequestError("Failed to get OTP status");
  }
};