// auth/src/controllers/signup.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { User } from "../models/userModel";
import { hashPassword } from "../utils/hashPassword";
import { publish_user_created } from "../events/publishers/user-created";
import { EmailOtp } from "../models/otpModel";
import generateSecureOTP from "../utils/generate-otp";
import { OTP_CONFIG } from "../config/constants";

export const signupController = async (req: Request, res: Response) => {
  const body = req.body;
  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email already in use", "email");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = User.build({
    name,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();

  // Generate OTP
  const otp = generateSecureOTP();
  const expiresAt = new Date(Date.now() + OTP_CONFIG.EXPIRY_MINUTES * 60 * 1000);

  // Store OTP in database
  await EmailOtp.findOneAndUpdate(
    { userId: user.id },
    {
      name: user.name,
      userId: user.id,
      email: user.email,
      role: "user",
      otp,
      expiresAt,
      resendCount: 0,
      lastResendAt: new Date(),
    },
    { upsert: true, new: true }
  );

  // Publish event with OTP
  await publish_user_created({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: "user",
    otp,
  });

  sendResponse(res, 201, { success: true, data: { email: user.email } });
  return;
};
