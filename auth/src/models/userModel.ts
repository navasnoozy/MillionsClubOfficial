import { Schema, model, Document, Model } from "mongoose";

type Role = "user" | "admin" | "moderator";
type Provider = "credentials" | "google" | "github" | "facebook";

export interface UserAttrs {
  name: string;
  email: string;
  password?: string;
  role?: Role;
  image?: string;
  providers?: Provider[];
  providerIds?: Map<string, string>;
  isActive?: boolean;
  emailVerified?: boolean;
  lastLogin?: Date;
}

export interface UserDoc extends Document {
  name: string;
  email: string;
  password?: string;
  role: Role;
  image?: string;
  providers: Provider[];
  providerIds?: Map<string, string>;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new Schema<UserDoc, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: {
      type: String,
      required: function (this: UserDoc) {
        const prov = this.providers;
        if (!Array.isArray(prov)) return true;
        if (prov.length === 1 && prov[0] === "credentials") return true;
        return false;
      },
    },
    providers: {
      type: [String],
      enum: ["credentials", "google", "github", "facebook"],
      default: ["credentials"],
    },
    providerIds: {
      type: Map,
      of: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    image: {
      type: String,
    },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const obj = ret as any;
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.password;
        return obj;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

export const User = model<UserDoc, UserModel>("User", userSchema);
