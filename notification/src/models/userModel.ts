import { Schema, Document, model } from "mongoose";

interface IOtp extends Document {
  userId: string;
  otp: number;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    userId: { type: String, required: true, index: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Otp = model<IOtp>("Otp", otpSchema);
