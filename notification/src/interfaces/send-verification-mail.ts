//src/interfaces/SendVerificationEmail.ts

export interface EmailVerifyParams {
  email: string;
  userId?: string;
}

export interface EmailVerifyResult {
  success: boolean;
  message: string;
  canResend?: boolean;
  cooldownSeconds?: number;
}
