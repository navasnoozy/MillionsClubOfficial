import mongoose, { Schema } from "mongoose";
import { Subcategory } from "./subCategory";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [{ type: mongoose.Types.ObjectId, ref: "Subcategory" }],
},{timestamps:true});

// Delete all subcategories associated with the category

categorySchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  await Subcategory.deleteMany({ parentCategoryId: doc._id });
});

export const Category = mongoose.model("Category", categorySchema);
