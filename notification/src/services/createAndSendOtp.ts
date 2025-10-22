//src/services/createAndSendOtp.ts

import { BadRequestError } from "@millionsclub/shared-libs/server";
import { sendGridMail } from "./sendGridMail";
import { EmailVerifyResult } from "../interfaces/SendVerificationEmail";
import generateSecureOTP from "../utils/generateSecureOTP";
import { Otp } from "../models/otpModel";
import { OTP_CONFIG } from "../config/constants";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";

export const createAndSendOtp = async (
  userId: string,
  email: string,
  name: string
): Promise<EmailVerifyResult> => {
  try {
    const otp = generateSecureOTP();
    const expiresAt = new Date(
      Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000
    );

    // Create or update OTP record
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

    // Send verification email
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
    console.error("Error in createAndSendOtp service:", error);
    throw new BadRequestError("Failed to create and send OTP");
  }
};
