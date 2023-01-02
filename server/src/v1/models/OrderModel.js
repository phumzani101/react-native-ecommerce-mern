import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
    },
    totalPrice: { type: Number },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

OrderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    model: "User",
    // select: "name avatar createdAt",
  }).populate({
    path: "items.product",
    model: "Product",
    // select: "name slug",
  });

  next();
});

OrderSchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

export default mongoose.model("OrderModel", OrderSchema);
