import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema ( {
     name: {
          type : String,
          required: true,
          unique: true
     },
     slug: {
          type: String,
          required: true,
          unique: true,
     },
     subcategories: [{type:mongoose.Types.ObjectId,ref: 'Subcategory'}]
});

export const Category = mongoose.model ("Category", categorySchema);