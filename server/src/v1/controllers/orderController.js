import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import OrderModel from "../models/OrderModel.js";

const list = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderModel.find();
  return res.json({ orders });
});

const create = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderModel.create(req.body);
  return res.json({ order });
});

const orderById = catchAsyncErrors(async (req, res, next, id) => {
  const order = await OrderModel.findById(id);
  if (!order) {
    return next(new ErrorHelper("Order not found", 404));
  }
  req.order = order;
  return next();
});

const read = catchAsyncErrors(async (req, res, next) => {
  const order = req.order;
  return res.json({ order });
});

const update = catchAsyncErrors(async (req, res, next) => {
  const order = req.order;
  return res.json({ order });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const order = req.order;
  await order.remove();
  return res.json({ order });
});

export default { list, create, read, update, remove, orderById };
