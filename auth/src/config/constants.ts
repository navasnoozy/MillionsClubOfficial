// auth/src/config/constants.ts

export const OTP_CONFIG = {
  EXPIRY_MINUTES: 10,

  // Rate limiting for resend
  MIN_RESEND_INTERVAL_SECONDS: 60,
  MAX_RESEND_ATTEMPTS_PER_HOUR: 5,
  MAX_RESEND_ATTEMPTS_TOTAL: 10,

  // OTP generation
  OTP_MIN: 100000,
  OTP_MAX: 999999,
} as const;
