// auth/src/types/user-interface.ts
import { Document, Model } from "mongoose";

// An interface that describes the properties
// that a User Document has
export interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
}

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  name: string
  email: string;
  password:string
}

// An interface that describes the properties
// that a User Model has
export interface UserModel extends Model<UserDoc> {
  build (attrs : UserAttrs): UserDoc;
}