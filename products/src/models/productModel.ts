import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
     type : String,
     
  },
  category: {
     type: String,
     required: true,
  },
  basePrice: {
     type: Number,

  },
  description:{
     type: String
  },
  isActive: {
     type: Boolean
  },
  variantIds:  [
    {
      type:  Schema.Types.ObjectId,
      ref: "ProductVariants",
      required: true,
    },
  ],
},{
     timestamps:true
});

export const Product = mongoose.model('Product', productSchema)