//src/controllers/verifyEmail.ts

import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { Request, Response } from "express";
import { EmailOtp } from "../models/otpModel";
import { publish_email_verified } from "../events/publishers/email-verified";
import jwt from "jsonwebtoken";

const emailVerification = async (req: Request, res: Response) => {
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

  await publish_email_verified({
    userId: otpData.userId,
    email: otpData.email,
  });

  await EmailOtp.deleteOne({ _id: otpData._id });

  const jwt_token = jwt.sign(
    {
      id: otpData.id,
      email: otpData.email,
    },
    process.env.JWT_KEY!
  );

  return sendResponse(res, 200, {
    success: true,
    message: "Email verified",
  });
};

export { emailVerification };
