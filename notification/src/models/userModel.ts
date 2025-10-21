import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document {
  name: string;
  userId: string;
  email: string;
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
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true, index: true },
    resendCount: { type: Number, default: 0 },
    lastResendAt: { type: Date },
  },
  { timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = mongoose.model<IOtp>("Otp", otpSchema);
