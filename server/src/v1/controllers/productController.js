import ProductModel from "../models/ProductModel.js";

const list = async (req, res) => {
  const products = await ProductModel.find();
  return res.json({ products });
};

const create = async (req, res) => {
  const product = await ProductModel.create(req.body);
  return res.json({ product });
};

const productById = async (req, res, next, id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    return res.json({ error: "Product not found" });
  }
  req.product = product;
  return next();
};

const read = (req, res) => {
  const product = req.product;
  return res.json({ product });
};

const update = (req, res) => {
  const product = req.product;
  return res.json({ product });
};

const remove = async (req, res) => {
  const product = req.product;
  await product.remove();
  return res.json({ product });
};

export default { list, create, read, update, remove, productById };
