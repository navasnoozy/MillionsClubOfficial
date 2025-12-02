// auth/src/controllers/resend-otp.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { EmailOtp } from "../models/otpModel";
import generateSecureOTP from "../utils/generate-otp";
import { OTP_CONFIG } from "../config/constants";
import { publish_user_created } from "../events/publishers/user-created";
import canResendOTP from "../helper/can-resend-otp";


export const resendOtpController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  const otpRecord = await EmailOtp.findOne({ email });

  if (!otpRecord) {
    throw new BadRequestError("No OTP found for this email. Please register first.");
  }

  const resendCheck = canResendOTP(otpRecord);

  if (!resendCheck.allowed) {
    const message = resendCheck.cooldownSeconds ? `Please wait ${resendCheck.cooldownSeconds} seconds before requesting another OTP` : resendCheck.reason || `Cannot resend OTP at this time`;

    throw new BadRequestError(message);
  }

  const newOTP = generateSecureOTP();
  const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);
  const now = new Date();

  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const otpExpired = otpRecord.expiresAt < now;
  const hourPassed = otpRecord.lastResendAt && otpRecord.lastResendAt <= oneHourAgo;

  if (otpExpired || hourPassed) {
    otpRecord.resendCount = 1;
  } else {
    otpRecord.resendCount += 1;
  }

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
