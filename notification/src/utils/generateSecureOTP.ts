import crypto from "crypto";
import { OTP_CONFIG } from "../config/constants";

const generateSecureOTP = (): number => {
  return crypto.randomInt(OTP_CONFIG.OTP_MIN, OTP_CONFIG.OTP_MAX);
};

export default generateSecureOTP;
