import mongoose, { Schema } from "mongoose";

const subcategorySchema  = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
