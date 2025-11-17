// src/routes/otpRoutes.ts
import { require_auth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rate-limiter";
import { sendMail } from "../controllers/send-otp";
import { checkOTPStatus } from "../controllers/check-otp-status";
import { resendOTP } from "../controllers/resend-otp";

const otpRouter = Router();

otpRouter.post("/api/notification/send-otp", require_auth, otpSendLimiter, sendMail);

otpRouter.post("/api/notification/resend-otp", otpResendLimiter, resendOTP);

otpRouter.get("/api/notification/status", checkOTPStatus);

export default otpRouter;
