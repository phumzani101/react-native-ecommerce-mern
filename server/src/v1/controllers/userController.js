import _ from "lodash";
import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/UserModel.js";

const list = async (req, res, next) => {
  const users = await UserModel.find();
  return res.json({ users });
};

const create = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  return res.json({ user });
});

const userById = catchAsyncErrors(async (req, res, next, id) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return next(new ErrorHelper("User not found", 404));
  }
  req.user = user;
  return next();
});

const read = (req, res, next) => {
  const user = req.user;
  return res.json({ user });
};

const update = catchAsyncErrors(async (req, res, next) => {
  let user = req.user;
  user = _.extend(user, req.body);
  await user.save();
  return res.json({ user });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  await user.remove();
  return res.json({ user });
});

const count = catchAsyncErrors(async (req, res, next) => {
  const userCount = await ProductModel.countDocuments();
  return res.json({ userCount });
});

export default { list, create, read, update, remove, userById, count };
