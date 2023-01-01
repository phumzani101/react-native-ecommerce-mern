import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";
import jwt from "jsonwebtoken";
import config from "../../../config/index.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: "Email is required",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: String,
    phone: String,
    street: String,
    apartment: String,
    zip: String,
    city: String,
    country: String,
    isAdmin: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now();
  next();
});

UserSchema.methods.authenticate = async function (siginPassword) {
  return await bcrypt.compare(siginPassword, this.password);
};

UserSchema.static("isValidId", function isValidId(id) {
  return mongoose.isValidObjectId(id);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

export default mongoose.model("UserModel", UserSchema);
