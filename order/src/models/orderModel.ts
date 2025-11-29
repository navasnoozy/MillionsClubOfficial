import mongoose, { Schema, Document } from "mongoose";

export interface OrderItemSnapshot {
  productId: mongoose.Types.ObjectId;
  variantId: mongoose.Types.ObjectId;

  // Product snapshot
  title: string;
  brand?: string;
  basePrice: number;

  // Variant snapshot
  color: string;
  size: string;
  images: {
    secure_url: string;
    public_id: string;
  }[];

  quantity: number;

  lineTotal: number; // basePrice * quantity  (discount logic added if needed)
}

export interface OrderDoc extends Document {
  userId: mongoose.Types.ObjectId;

  items: OrderItemSnapshot[];

  totalAmount: number;        // final order total
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";

  paymentId?: string;         // Razorpay / Stripe ID
  orderTrackingId?: string;   // Shipping provider ID

  shippingAddress: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

const orderItemSnapshotSchema = new Schema<OrderItemSnapshot>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    variantId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    // product snapshot
    title: { type: String, required: true },
    brand: { type: String },
    basePrice: { type: Number, required: true },

    // variant snapshot
    color: { type: String, required: true },
    size: { type: String, required: true },
    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],

    quantity: { type: Number, required: true, min: 1 },

    lineTotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema<OrderDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSnapshotSchema],
      required: true,
    },

    totalAmount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentId: String,
    orderTrackingId: String,

    shippingAddress: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<OrderDoc>("Order", orderSchema);
