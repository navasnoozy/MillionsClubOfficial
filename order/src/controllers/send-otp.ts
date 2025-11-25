// src/controllers/otpController.ts
// Renamed from sendMail.ts; consolidated logic, improved consistency
// Now uses centralized otpService

import { Request, Response } from "express";
import { sendVerificationEmail, getOTPStatus } from "../services/otp-services";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";

export const sendMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    const result = await sendVerificationEmail({ email });

    if (!result.success) {
      return sendResponse(res, 429, result); // 429 Too Many Requests
    }

    sendResponse(res, 200, result);
  } catch (error) {
    console.error("Error in sendMail controller:", error);

    if (error instanceof BadRequestError) {
      return sendResponse(res, 400, {
        success: false,
        message: error.message,
      });
    }

    sendResponse(res, 500, {
      success: false,
      message: "Internal server error",
    });
  }
};
