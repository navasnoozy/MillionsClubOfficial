import mongoose, { Schema, Document } from "mongoose";

export interface VariantDoc extends Document<string> {
  _id: string;
  productId: string;
  size: string;
  price: number;
  quantity: number;
  isActive: boolean;
}


const productVariantSchema = new Schema<VariantDoc>(
  {
    _id: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
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
    
    await ProductModel.updateMany(
      { variantIds: doc._id }, 
      { $pull: { variantIds: doc._id } }
    );
    console.log(`Removed variant reference ${doc._id} from Products.`);
  } catch (err) {
    console.error("Error cleaning up product references:", err);
  }
});

export const ProductVariant = mongoose.model<VariantDoc>("ProductVariant", productVariantSchema);