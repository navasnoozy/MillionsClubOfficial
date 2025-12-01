// auth/src/controllers/verify-email.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { EmailOtp } from "../models/otpModel";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Session } from "../models/sessionModel";

export const verifyEmailController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!otp) {
    throw new BadRequestError("Invalid OTP");
  }

  const numericOtp = Number(otp);

  if (Number.isNaN(numericOtp)) {
    throw new BadRequestError("Invalid OTP");
  }

  const otpData = await EmailOtp.findOne({ email });

  if (!otpData || otpData.otp !== numericOtp) {
    return sendResponse(res, 404, {
      success: false,
      message: "OTP expired or invalid",
    });
  }

  const isExpired = Date.now() > otpData.expiresAt.getTime();
  if (isExpired) {
    return sendResponse(res, 404, {
      success: false,
      message: "OTP expired",
    });
  }

  // Update user email verified status
  await User.findOneAndUpdate({ email: email }, { emailVerified: true });

  const jwt_access_token = jwt.sign(
    {
      id: otpData.userId,
      email: otpData.email,
      role: otpData.role,
    },
    process.env.JWT_KEY!,
    { expiresIn: "1m" }
  );

  const jwt_refresh_token = jwt.sign(
    {
      id: otpData.userId,
    },
    process.env.JWT_KEY!,
    { expiresIn: "4m" }
  );

  await Session.create(
    { userId: otpData.userId },
    { userId: otpData.userId, refreshToken: jwt_refresh_token, lastUsedAt: new Date() }
  );

  res.cookie("refresh_token", jwt_refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/users/refresh-token",
  });

  await EmailOtp.deleteOne({ _id: otpData._id });

  return sendResponse(res, 200, {
    success: true,
    message: "Email verified",
    data: { accessToken: jwt_access_token },
  });
};
