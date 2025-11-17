// src/routes/otpRoutes.ts
import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rate-limiter";
import { sendMail } from "../controllers/send-otp";
import { checkOTPStatus } from "../controllers/check-otp-status";
import { resendOTP } from "../controllers/resend-otp";

const otpRouter = Router();

otpRouter.post("/sendotp", requireAuth, otpSendLimiter, sendMail);

otpRouter.post("/resendotp", otpResendLimiter, resendOTP);

otpRouter.get("/status", checkOTPStatus);

export default otpRouter;
