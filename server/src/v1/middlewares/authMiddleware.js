import jwt from "jsonwebtoken";
import { promisify } from "util";
import config from "../../../config/index.js";
import UserModel from "../models/UserModel.js";

import { catchAsyncErrors } from "./errorMiddleware.js";

const isAuth = catchAsyncErrors(async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  let token = null;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    token = bearerToken;
  }

  if (req?.cookies?.token) {
    token = req?.cookies?.token;
  }

  if (!token) {
    return res.json({ error: "Please login to continue" });
  }
  // verify token
  let decoded = await promisify(jwt.verify)(token, config.jwtSecret);

  // check user
  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return res.json({ error: "Please login to continue" });
  }

  // pass user
  req.auth = user;
  return next();
});

const isAuthorized =
  (...roles) =>
  (req, res, next) => {
    // roles -> ['admin', 'lead']
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    return next();
  };

export default { isAuth, isAuthorized };
