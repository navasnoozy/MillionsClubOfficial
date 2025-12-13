import mongoose, { Schema, Document } from "mongoose";

// Status enum for stock status
export enum VariantStatus {
  IN_STOCK = "in_stock",
  OUT_OF_STOCK = "out_of_stock",
  LIMITED_STOCK = "limited_stock",
}

// Thresholds for stock status
const STOCK_THRESHOLDS = {
  OUT_OF_STOCK: 0,
  LIMITED_STOCK: 10, // 1-10 is limited stock
};

export interface IProductVariant extends Document {
  productId: mongoose.Types.ObjectId;
  size: string;
  price: number;
  quantity: number;
  status: VariantStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to determine status based on quantity
function getStatusFromQuantity(quantity: number): VariantStatus {
  if (quantity <= STOCK_THRESHOLDS.OUT_OF_STOCK) {
    return VariantStatus.OUT_OF_STOCK;
  } else if (quantity <= STOCK_THRESHOLDS.LIMITED_STOCK) {
    return VariantStatus.LIMITED_STOCK;
  } else {
    return VariantStatus.IN_STOCK;
  }
}

const productVariantSchema = new Schema<IProductVariant>(
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
    status: {
      type: String,
      enum: Object.values(VariantStatus),
      default: VariantStatus.OUT_OF_STOCK,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to automatically set status based on quantity
productVariantSchema.pre("save", function (next) {
  this.status = getStatusFromQuantity(this.quantity);
  next();
});

// Pre-update middleware to automatically set status based on quantity
productVariantSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as Record<string, unknown>;
  
  // If quantity is being updated, also update the status
  if (update && typeof update.quantity === "number") {
    update.status = getStatusFromQuantity(update.quantity);
  } else if (update && update.$set && typeof (update.$set as Record<string, unknown>).quantity === "number") {
    (update.$set as Record<string, unknown>).status = getStatusFromQuantity(
      (update.$set as Record<string, unknown>).quantity as number
    );
  }
  
  next();
});

// Remove variant reference from product after variant is deleted
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

export const ProductVariants = mongoose.model<IProductVariant>("ProductVariants", productVariantSchema);
