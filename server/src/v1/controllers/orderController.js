import _ from "lodash";
import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import OrderModel from "../models/OrderModel.js";

const list = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });
  return res.json({ orders });
});

const create = catchAsyncErrors(async (req, res, next) => {
  const userId = req.auth._id;
  const { items, shippingAddress, city, zip, country, phone } = req.body;
  let order = new OrderModel({
    items,
    shippingAddress,
    city,
    zip,
    country,
    phone,
    user: userId,
  });
  order.totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  order = await order.save();

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
  let order = req.order;
  order = _.extend(order, req.body);
  await order.save();
  return res.json({ order });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const order = req.order;
  await order.remove();
  return res.json({ order });
});

const totalsales = catchAsyncErrors(async (req, res, next) => {
  const totalprize = await OrderModel.aggregate([
    { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
  ]);

  return res.json({ totalprize });
});

const count = catchAsyncErrors(async (req, res, next) => {
  const orderCount = await ProductModel.countDocuments();
  return res.json({ orderCount });
});

export default {
  list,
  create,
  read,
  update,
  remove,
  orderById,
  totalsales,
  count,
};
