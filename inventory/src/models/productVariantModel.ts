import mongoose, { Schema } from "mongoose";

const productVariantSchema = new Schema(
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
      default: true,
    },
  },
  { timestamps: true }
);

productVariantSchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;

  try {
    const ProductModel = mongoose.model("Product");

    await ProductModel.updateMany({ variantIds: doc._id }, { $pull: { variantIds: doc._id } });
    console.log(`Removed variant reference ${doc._id} from Products.`);
  } catch (err) {
    console.error("Error cleaning up product references:", err);
  }
});

export const ProductVariants = mongoose.model("ProductVariants", productVariantSchema);
