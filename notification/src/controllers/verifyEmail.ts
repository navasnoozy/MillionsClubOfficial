import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";
import { Request, Response } from "express";
import { EmailOtp } from "../models/otpModel";

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!otp) {
      throw new BadRequestError("Invalid Otp");
    }

    const otpData = await EmailOtp.findOne({ email: email });

    if (!otpData) {
      sendResponse(res, 404, { success: false, message: "OTP expired" });
    };

    if (otpData?.otp === Number(otp)){
        
    } 

  } catch (error) {
    console.error("Error while OTP verification");
  }
};
