// auth/src/routes/check-otp-status.ts
import express from "express";
import { checkOtpStatusController } from "../controllers/check-otp-status";
import { otpResendLimiter } from "../middlewares/rate-limiter";
import { resendOtpController } from "../controllers/resend-otp";

const router = express.Router();

router.get("/status", checkOtpStatusController);
router.post("/resend", otpResendLimiter, resendOtpController);

export { router as otpRoutes };
