import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    tagline: { type: String, trim: true },
    description: { type: String, trim: true },
    imagecover: {
      type: String,
    },
    images: [{ type: String, trim: true }],
    brand: { type: String, trim: true },
    price: { type: Number, default: 0 },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    countInStock: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

ProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    model: "User",
    select: "name slug avatar email contacts createdAt",
  }).populate({
    path: "category",
    model: "Category",
    select: "name slug",
  });

  next();
});

ProductSchema.plugin(mongoosePaginate);

ProductSchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

ProductSchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

export default mongoose.model("ProductModel", ProductSchema);
