import { Schema, model, Document, Types } from "mongoose";

export interface VerifyToken extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}