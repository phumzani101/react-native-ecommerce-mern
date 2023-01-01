import * as dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const connectMongodb = (url) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.log("Failed to connect to MongoDB: " + err.message);
    });
};

const config = {
  port: process.env.PORT || "8080",
  mongoUrl: process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/rnshopdb",
  connectMongodb,
};

export default config;
