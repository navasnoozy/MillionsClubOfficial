// auth/src/controllers/verify-email.controller.ts
import { Request, Response } from "express";
import { BadRequestError, sendResponse, NotFoundError } from "@millionsclub/shared-libs/server";
import { EmailOtp } from "../models/otpModel";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";
import { Session } from "../models/sessionModel";
import { cookieOptions } from "../config/cookieOptions";

export const verifyEmailController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new BadRequestError("Email and OTP are required");
  }

  const numericOtp = Number(otp);

  if (Number.isNaN(numericOtp)) {
    throw new BadRequestError("Invalid OTP format");
  }

  const otpData = await EmailOtp.findOne({ email });

  if (!otpData || otpData.otp !== numericOtp) {
    throw new BadRequestError("Invalid or expired OTP");
  }

  const isExpired = Date.now() > otpData.expiresAt.getTime();
  if (isExpired) {
    await EmailOtp.deleteOne({ _id: otpData._id });
    throw new BadRequestError("OTP has expired");
  }

  const user = await User.findOneAndUpdate({ email: email }, { emailVerified: true }, { new: true });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const jwt_access_token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!,
    { expiresIn: "15m" }
  );

  const jwt_refresh_token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_KEY!,
    { expiresIn: "7d" }
  );

  await Session.create({
    userId: user.id,
    refreshToken: jwt_refresh_token,
    lastUsedAt: new Date(),
  });

  res.cookie("refresh_token", jwt_refresh_token, {
    ...cookieOptions,
  });

  await EmailOtp.deleteOne({ _id: otpData._id });

  return sendResponse(res, 200, {
    success: true,
    message: "Email verified successfully",
    data: { accessToken: jwt_access_token },
  });
};
