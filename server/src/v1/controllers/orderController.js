import OrderModel from "../models/OrderModel.js";

const list = async (req, res) => {
  const orders = await OrderModel.find();
  return res.json({ orders });
};

const create = async (req, res) => {
  const order = await OrderModel.create(req.body);
  return res.json({ order });
};

const orderById = async (req, res, next, id) => {
  const order = await OrderModel.findById(id);
  if (!order) {
    return res.json({ error: "Order not found" });
  }
  req.order = order;
  return next();
};

const read = (req, res) => {
  const order = req.order;
  return res.json({ order });
};

const update = (req, res) => {
  const order = req.order;
  return res.json({ order });
};

const remove = async (req, res) => {
  const order = req.order;
  await order.remove();
  return res.json({ order });
};

export default { list, create, read, update, remove, orderById };
