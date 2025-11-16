// src/routes/otpRoutes.ts
import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rateLimiter";
import { sendMail } from "../controllers/sendOtp";
import { checkOTPStatus } from "../controllers/checkOtpStatus";
import { resendOTP } from "../controllers/resendOtp";

const otpRouter = Router();

otpRouter.post("/sendotp", requireAuth, otpSendLimiter, sendMail);

otpRouter.post("/resendotp", otpResendLimiter, resendOTP);

otpRouter.get("/status", checkOTPStatus);

export default otpRouter;
