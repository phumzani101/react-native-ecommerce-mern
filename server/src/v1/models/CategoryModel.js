import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model("CategoryModel", CategorySchema);
