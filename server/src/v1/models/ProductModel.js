import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    image: String,
    description: String,
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductModel", ProductSchema);
