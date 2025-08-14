import mongoose, { Schema } from "mongoose";
import { Category } from "./categoryModel";

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});


//DELETE THE SUB CATEGORY FROM PARENT WHEN SUB DELETED
subcategorySchema.post("findOneAndDelete", async (doc) => {
  if (!doc) return;
  await Category.updateMany(
    { subcategories: doc._id },
    { $pull: { subcategories: doc._id } }
  );
});

subcategorySchema.index({ name: 1, parentCategoryId: 1 }, { unique: true });

export const Subcategory = mongoose.model("Subcategory", subcategorySchema);
