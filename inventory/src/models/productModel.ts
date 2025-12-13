import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  color: string;
  brand?: string;
  subCategoryId: mongoose.Types.ObjectId;
  basePrice?: number;
  images: Array<{ secure_url: string; public_id: string }>;
  description?: string;
  isActive: boolean;
  variantIds: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    subCategoryId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    basePrice: {
      type: Number,
    },

    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    variantIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVariants",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
productSchema.index({ title: "text", brand: "text", color: "text" });

export const Product = mongoose.model<IProduct>("Product", productSchema);
