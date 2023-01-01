import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import compress from "compression";

// local imports
import v1routes from "./src/v1/routes/index.js";
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(cookieParser());
app.use(compress());

// v1 routes
app.use("/api/v1/auth", v1routes.authRoutes);
app.use("/api/v1/products", v1routes.productRoutes);
app.use("/api/v1/users", v1routes.userRoutes);
app.use("/api/v1/orders", v1routes.orderRoutes);
app.use("/api/v1/categories", v1routes.categoryRoutes);

// default route
app.get("/", function (req, res) {
  res.send("Hello World");
});

export default app;
