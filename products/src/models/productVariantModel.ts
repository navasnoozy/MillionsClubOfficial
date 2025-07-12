import mongoose, { Schema } from "mongoose";
import { Product } from "./productModel";

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

productVariantModel.post('findOneAndDelete', async (doc)=>{
  if (!doc) return;
  await Product.updateMany({ variantIds: doc._id}, {$pull:{variantIds: doc._id}})
})

export const ProductVariants = mongoose.model(
  "ProductVariants",
  productVariantModel
);
