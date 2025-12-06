import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    color: {
      type: String,
      required: true,
      trim: true
    },

    brand: {
      type: String,
      trim: true
    },

    categoryId: {
      type: Schema.Types.ObjectId,
    },

    subCategoryId: {
      type: Schema.Types.ObjectId,
      required: true
    },

    basePrice: {
      type: Number,
    },

    images: [
      {
        secure_url: String,
        public_id: String
      }
    ],

    description: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    variantIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductVariants"
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model("Product", productSchema);
