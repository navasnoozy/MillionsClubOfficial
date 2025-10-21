import { Schema, Document, model } from "mongoose";

interface IOtp extends Document {
  userId: Schema.Types.ObjectId;
  otp: Number;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    otp: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Otp = model<IOtp>("Otp", otpSchema);
