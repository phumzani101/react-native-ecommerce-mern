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
    icon: String,
    color: String,
  },
  { timestamps: true }
);

CategorySchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

export default mongoose.model("CategoryModel", CategorySchema);
