//src/services/createAndSendOtp.ts

import { BadRequestError } from "@millionsclub/shared-libs/server";
import { OTP_CONFIG } from "../config/constants";
import { EmailVerifyResult } from "../interfaces/send-verification-mail";
import { EmailOtp } from "../models/otpModel";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";
import generateSecureOTP from "../utils/generate-otp";
import { canResendOTP } from "./otp-services";
import { sendGridMail } from "./send-grid-mail";

interface CreateSendOTP {
  (userId: string, email: string, name: string, role:string): Promise<EmailVerifyResult>;
}

const createAndSendInitialOtp: CreateSendOTP = async (userId, email, name, role) => {
  try {
    const existingOtp = await EmailOtp.findOne({ userId });

    if (existingOtp) {
      const resendCheck = canResendOTP(existingOtp);

      if (!resendCheck.allowed) {
        return {
          success: false,
          message: resendCheck.reason || "Cannot send OTP at this time",
          canResend: false,
          cooldownSeconds: resendCheck.cooldownSeconds,
        };
      }
    }

    const otp = generateSecureOTP();
    const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
    const now = new Date();

    // Determine if we need to reset hourly counter
    let newResendCount = 0;
    if (existingOtp) {
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      // Reset if more than 1 hour OR if OTP expired
      if (existingOtp.expiresAt < now || (existingOtp.lastResendAt && existingOtp.lastResendAt <= oneHourAgo)) {
        newResendCount = 0;
      } else {
        newResendCount = existingOtp.resendCount + 1;
      }
    }

    // Upsert OTP record
    await EmailOtp.findOneAndUpdate(
      { userId },
      {
        name,
        userId,
        email,
        role,
        otp,
        expiresAt,
        resendCount: newResendCount,
        lastResendAt: now,
      },
      { upsert: true, new: true }
    );

    // Send email
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
      canResend: false, // Just sent, cooldown applies
    };
  } catch (error) {
    console.error("Error in createAndSendInitialOtp:", {
      userId,
      email,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });

    if (error instanceof BadRequestError) {
      throw error;
    }

    throw new BadRequestError("Failed to send verification email");
  }
};

export default createAndSendInitialOtp;
