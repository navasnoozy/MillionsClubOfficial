import mongoose, { Schema } from "mongoose";

const productVariantModel = new Schema({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  productId: {
    type:  Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
    isActive: {
     type: Boolean
  },
});

export const ProductVariants = mongoose.model(
  "ProductVariants",
  productVariantModel
);
