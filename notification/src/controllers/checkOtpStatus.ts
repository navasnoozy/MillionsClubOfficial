import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { getOTPStatus } from "../services/otpService";
import { Request, Response } from "express";

/**
 * Check OTP status endpoint
 */
export const checkOTPStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      throw new BadRequestError("Email is required");
    }

    const status = await getOTPStatus(email as string);

    sendResponse(res, 200, {
      success: true,
      data: status,
    });
  } catch (error) {
    console.error("Error in checkOTPStatus controller:", error);

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
