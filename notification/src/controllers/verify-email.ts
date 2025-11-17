//src/controllers/verifyEmail.ts

import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { Request, Response } from "express";
import { EmailOtp } from "../models/otpModel";
import { publish_email_verified } from "../events/publishers/email-verified";

const emailVerification = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!otp) {
      throw new BadRequestError("Invalid OTP");
    }

    const numericOtp = Number(otp);

    if (Number.isNaN(numericOtp)) {
      throw new BadRequestError("Invalid OTP format");
    }

    const otpData = await EmailOtp.findOne({ email });

    if (!otpData || otpData.otp !== numericOtp) {
      return sendResponse(res, 404, {
        success: false,
        message: "OTP expired or invalid",
      });
    }

    await publish_email_verified({
      userId: otpData.userId,
      email: otpData.email,
    });

    await EmailOtp.deleteOne({ _id: otpData._id });

    return sendResponse(res, 200, {
      success: true,
      message: "Email verified",
    });
  } catch (error) {
    console.error("Error while OTP verification:", error);
    return sendResponse(res, 500, {
      success: false,
      message: "Internal server error",
    });
  }
};

export { emailVerification };
