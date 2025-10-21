



// =============================================
// src/controllers/sendMail.ts
// =============================================
// Controllers for OTP operations

import { Request, Response } from "express";
import { 
  sendVerificationEmail, 
  getOTPStatus 
} from "../services/emailService";
import { BadRequestError, sendResponse } from "@millionsclub/shared-libs/server";

/**
 * Send verification email (manual resend)
 */
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

/**
 * Resend OTP endpoint (dedicated resend)
 */
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
        message: status.cooldownSeconds 
          ? `Please wait ${status.cooldownSeconds} seconds before requesting another OTP`
          : "Cannot resend OTP at this time",
        cooldownSeconds: status.cooldownSeconds,
      });
    }

    // Send new OTP
    const result = await sendVerificationEmail({ email });

    if (!result.success) {
      return sendResponse(res, 429, result);
    }

    sendResponse(res, 200, {
      ...result,
      resendCount: status.resendCount,
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

/**
 * Check OTP status endpoint
 */
export const checkOTPStatus = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      throw new BadRequestError("Email is required");
    }

    const status = await getOTPStatus(email);

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


// =============================================
// src/routes/routes.ts
// =============================================
// Updated routes with resend endpoint

import { requireAuth } from "@millionsclub/shared-libs/server";
import { Router } from "express";
import { sendMail, resendOTP, checkOTPStatus } from "../controllers/sendMail";
import { otpResendLimiter, otpSendLimiter } from "../middleware/rateLimiter";

const router = Router();

// Initial send (protected, with rate limiting)
router.post("/sendmail", requireAuth, otpSendLimiter, sendMail);

// Resend OTP (public, with stricter rate limiting)
router.post("/resend-otp", otpResendLimiter, resendOTP);

// Check OTP status (public, no rate limit needed for read)
router.get("/otp-status", checkOTPStatus);

export default router;


// =============================================
// src/events/consumers/cons.authEvents.ts
// =============================================
// Kafka consumer unchanged

import { AuthEvent, TOPICS } from "@millionsclub/shared-libs/server";
import { EachMessagePayload } from "kafkajs";
import { notificationKafkaClient } from "../../config/kafka.client";
import { createAndSendOtp } from "../../services/emailService";

export const subscribeToAuthEvents = async () => {
  try {
    await notificationKafkaClient.subscribe(
      TOPICS.AUTH_EVENTS,
      async ({ message }: EachMessagePayload) => {
        try {
          const value = message.value?.toString();
          if (!value) return;

          const event = JSON.parse(value) as AuthEvent;

          if (event.type === "user.created") {
            await createAndSendOtp(
              event.userId,
              event.data.email,
              event.data.name
            );

            console.log(
              `Verification email sent to ${event.data.email} for user ${event.userId}`
            );
          }
        } catch (error) {
          console.error("Error processing user.created event:", error);
        }
      }
    );
  } catch (error) {
    console.error("Failed to subscribe to auth events:", error);
    throw error;
  }
};