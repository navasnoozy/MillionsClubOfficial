// src/controllers/sendMail.ts
import { Request, Response } from "express";
import { Otp } from "../models/userModel";
import { sendGridMail } from "../services/sendGridMail";
import { verifyOtpTemplate } from "../templates/verifyOtpTemplate";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";

const sendMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new BadRequestError("Email id required");
    }

    const otpData = await Otp.findOne({ email });

    if (!otpData) {
      throw new BadRequestError("User record not found ");
    }

    const result = await sendGridMail({
      to: otpData.email,
      subject: "Millionsclub email verification",
      html: verifyOtpTemplate({
        name: otpData.name,
        otp: otpData.otp,
        expiryMinutes: 10,
      }),
    });

    sendResponse(res,200,{success:true, message: 'Verification mail sent'})
  } catch (error) {
    console.error("Error sending email:", error);
    throw new BadRequestError("Error sending email");
  }
};

export { sendMail };
