
// src/services/emailService.ts

import { Otp } from "../models/userModel";
import { sendGridMail } from "./sendGridMail";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";
import { BadRequestError } from "@millionsclub/shared-libs/server";
import { OTP_CONFIG } from "../config/constants";
import generateSecureOTP from "../utils/generateSecureOTP";
import { EmailVerifyParams, EmailVerifyResult } from "../interfaces/SendVerificationEmail";





const canResendOTP = (otpRecord: any): { 
  allowed: boolean; 
  reason?: string; 
  cooldownSeconds?: number;
} => {
  const now = new Date();
  
  if (otpRecord.expiresAt < now) {
    return { allowed: true };
  }

  // Check total resend attempts
  if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_TOTAL) {
    return { 
      allowed: false, 
      reason: "Maximum resend attempts reached. Please register again." 
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

  // Check hourly limit
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  if (otpRecord.lastResendAt && otpRecord.lastResendAt > oneHourAgo) {
    const recentResends = otpRecord.resendCount;
    if (recentResends >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
      return {
        allowed: false,
        reason: "Too many resend attempts. Please try again later.",
      };
    }
  }

  return { allowed: true };
};


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

    // Check if user can resend
    const resendCheck = canResendOTP(otpRecord);
    if (!resendCheck.allowed) {
      return {
        success: false,
        message: resendCheck.reason || "Cannot resend OTP at this time",
        canResend: false,
        cooldownSeconds: resendCheck.cooldownSeconds,
      };
    }

    // Generate new OTP
    const newOTP = generateSecureOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);

    // Update OTP record
    otpRecord.otp = newOTP;
    otpRecord.expiresAt = expiresAt;
    otpRecord.resendCount += 1;
    otpRecord.lastResendAt = new Date();
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
      canResend: true,
    };
  } catch (error) {
    console.error("Error in sendVerificationEmail service:", error);
    
    if (error instanceof BadRequestError) {
      throw error;
    }
    
    throw new BadRequestError("Failed to send verification email");
  }
};




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
