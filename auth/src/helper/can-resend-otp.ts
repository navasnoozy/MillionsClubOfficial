import { OTP_CONFIG } from "../config/constants";

const canResendOTP = (otpRecord: any) => {
  const now = new Date();

  // If OTP expired, allow immediate resend
  if (otpRecord.expiresAt < now) {
    return { allowed: true };
  }

  // Check total resend attempts
  if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_TOTAL) {
    return {
      allowed: false,
      reason: "Maximum resend attempts reached. Please register again.",
    };
  }

  // Check cooldown period
  if (otpRecord.lastResendAt) {
    const timeSinceLastResend = (now.getTime() - otpRecord.lastResendAt.getTime()) / 1000;
    const cooldownSeconds = OTP_CONFIG.MIN_RESEND_INTERVAL_SECONDS;

    if (timeSinceLastResend < cooldownSeconds) {
      const remainingSeconds = Math.ceil(cooldownSeconds - timeSinceLastResend);
      return {
        allowed: false,
        reason: `Please wait ${remainingSeconds} seconds before requesting another OTP`,
        cooldownSeconds: remainingSeconds,
      };
    }
  }

  // Check hourly rate limit
  if (OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    if (otpRecord.lastResendAt && otpRecord.lastResendAt > oneHourAgo) {
      if (otpRecord.resendCount >= OTP_CONFIG.MAX_RESEND_ATTEMPTS_PER_HOUR) {
        return {
          allowed: false,
          reason: "Too many resend attempts. Please try again in an hour.",
        };
      }
    }
  }

  return { allowed: true };
};

export default canResendOTP;
