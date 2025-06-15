// auth/src/models/userModel.ts
import mongoose, { Schema } from "mongoose";
import { UserAttrs, UserDoc, UserModel } from "../types/user-interface";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    isEmailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret.id;
        delete ret.password;
        delete ret.role;
        delete ret.isActive;
        delete ret.isEmailVerified;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
