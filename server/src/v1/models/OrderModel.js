import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
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

OrderSchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

export default mongoose.model("OrderModel", OrderSchema);
