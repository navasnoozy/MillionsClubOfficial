import { Schema, model} from "mongoose";
import { VerifyToken } from "../types/verifyToken";

const emailVerificationTokenSchema = new Schema<VerifyToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }, // 1 hour TTL
});


export const EmailVerificationToken = model<VerifyToken>(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
