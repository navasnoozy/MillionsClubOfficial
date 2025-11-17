import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { getOTPStatus, sendVerificationEmail } from "../services/otp-services";
import { Request, Response } from "express";

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("Email is required");
    }

    // Check OTP status first
    const status = await getOTPStatus(email);

    if (!status.exists) {
      return sendResponse(res, 404, {
        success: false,
        message: "No OTP found for this email. Please register first.",
      });
    }

    if (!status.canResend) {
      return sendResponse(res, 429, {
        success: false,
        message: status.cooldownSeconds ? `Please wait ${status.cooldownSeconds} seconds before requesting another OTP` : "Cannot resend OTP at this time",
        data: { cooldownSeconds: status.cooldownSeconds },
      });
    }

    // Send new OTP
    const result = await sendVerificationEmail({ email });

    if (!result.success) {
      return sendResponse(res, 429, result);
    }

    sendResponse(res, 200, {
      ...result,
      data: { resendCount: status.resendCount },
    });
  } catch (error) {
    console.error("Error in resendOTP controller:", error);

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
