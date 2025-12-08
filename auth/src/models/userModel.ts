import { Schema, model, Document, Model, Query } from "mongoose";

export type Role = "customer" | "admin" | "moderator";
export type Provider = "credentials" | "google" | "github" | "facebook";
export type status = "active" | "inactive" | "blocked";

declare module "mongoose" {
  interface QueryOptions {
    includeDeleted?: boolean;
  }
}

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
  isDeleted?: boolean;
  deletedAt?: Date;
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
  isDeleted: boolean;
  deletedAt?: Date;
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
      default: "active",
    },

    emailVerified: { type: Boolean, default: false },

    lastLogin: { type: Date },

    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date },
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

userSchema.pre(/^find|count/, function (this: Query<any, any>, next) {
  const options = this.getOptions();

  if (options.includeDeleted !== true) {
    this.find({ isDeleted: { $ne: true } });
  }

  next();
});

userSchema.index({ email: 1 }, { unique: true, partialFilterExpression: { isDeleted: { $eq: false } } });

// Safe build method
userSchema.statics.build = function (attrs: UserAttrs) {
  return new this(attrs);
};

export const User = model<UserDoc, UserModel>("User", userSchema, "user");
