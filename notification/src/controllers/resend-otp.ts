import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { getOTPStatus, sendVerificationEmail } from "../services/otp-services";
import { Request, Response } from "express";

export const resendOTP = async (req: Request, res: Response) => {
  const { email = null } = req.body;

  console.log(JSON.stringify(req.body));

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  // Check OTP status first
  const status = await getOTPStatus(email);

  if (!status.exists) {
    throw new BadRequestError("No OTP found for this email. Please register first.");
  }

  if (!status.canResend) {
    const message = status.cooldownSeconds ? `Please wait ${status.cooldownSeconds} seconds before requesting another OTP` : `Cannot resend OTP at this time`;

    throw new BadRequestError(message);
  }

  // Send new OTP
  const result = await sendVerificationEmail({ email });

  if (!result.success) {
    sendResponse(res, 429, result);
    return;
  }

  sendResponse(res, 200, {
    ...result,
    data: { resendCount: status.resendCount },
  });
  return;
};
