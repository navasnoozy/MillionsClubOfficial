import mongoose, { Schema, Document } from "mongoose";

export interface ProductDoc extends Document<string> {
  _id: string;
  title: string;
  basePrice: number;
  images: { secure_url: string; public_id: string }[];
  isActive: boolean;
  variantIds: string[];
}

const productSchema = new Schema<ProductDoc>(
  {
    _id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    basePrice: {
      type: Number,
    },

    images: [
      {
        secure_url: { type: String },
        public_id: { type: String },
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    variantIds: [
      {
        type: String,
        ref: "ProductVariants",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model<ProductDoc>("Product", productSchema);
