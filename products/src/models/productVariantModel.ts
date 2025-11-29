import mongoose, { Schema } from "mongoose";
import { Product } from "./productModel";

const productVariantModel = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

productVariantModel.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  await Product.updateMany({ variantIds: doc._id }, { $pull: { variantIds: doc._id } });
});

export const ProductVariants = mongoose.model("ProductVariants", productVariantModel);
