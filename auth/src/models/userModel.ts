import { Schema, model, Document, Model } from "mongoose";

export type Role = "customer" | "admin" | "moderator";
export type Provider = "credentials" | "google" | "github" | "facebook";
export type status = "active" | "inactive" | "blocked";

export interface UserAttrs {
  name: string;
  email: string;
  password?: string;
  role?: Role;
  image?: string;
  providers?: Provider[];
  providerIds?: Map<string, string>;
  status?: status;
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
  status: status;
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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: function (this: UserDoc) {
        const prov = this.providers ?? ["credentials"];
        return prov.includes("credentials");
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
      default: undefined,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "moderator"],
      default: "customer",
    },

    image: { type: String },

    status: { 
      type: String, 
      enum: ["active", "inactive", "blocked"], 
      default: "active" ,
    },

    emailVerified: { type: Boolean, default: false },

    lastLogin: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        const obj: any = ret; // TS-safe for delete operations

        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        delete obj.password;

        return obj;
      },
    },
  }
);

// Safe build method
userSchema.statics.build = function (attrs: UserAttrs) {
  return new this(attrs);
};

export const User = model<UserDoc, UserModel>("User", userSchema, "user");
