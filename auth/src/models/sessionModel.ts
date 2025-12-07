import mongoose, { Schema, model, Document } from "mongoose";

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  createdAt: Date;
  lastUsedAt: Date; 
}

const sessionSchema = new Schema<ISession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

sessionSchema.index({ lastUsedAt: 1 }, { expireAfterSeconds: 604800 });

sessionSchema.index({ userId: 1, refreshToken: 1 });

export const Session = model<ISession>("Session", sessionSchema);
