//src/models/userModel.ts

import mongoose, { Document, Schema } from "mongoose";

type Role = "customer" | "admin" | "moderator";

export interface IOtp extends Document {
  name: string;
  userId: string;
  email: string;
  role?: Role;
  otp: number;
  expiresAt: Date;
  resendCount: number;
  lastResendAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    role: {
      type: String,
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    resendCount: { type: Number, default: 0 },
    lastResendAt: { type: Date },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 86400 }); //24hr

export const EmailOtp = mongoose.model<IOtp>("Otp", otpSchema);
