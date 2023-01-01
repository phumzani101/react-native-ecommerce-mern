import CategoryModel from "../models/CategoryModel.js";

const list = async (req, res) => {
  const categories = await CategoryModel.find();
  return res.json({ categories });
};

const create = async (req, res) => {
  const category = await CategoryModel.create(req.body);
  return res.json({ category });
};

const categoryById = async (req, res, next, id) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    return res.json({ error: "Category not found" });
  }
  req.category = category;
  return next();
};

const read = (req, res) => {
  const category = req.category;
  return res.json({ category });
};

const update = (req, res) => {
  const category = req.category;
  return res.json({ category });
};

const remove = async (req, res) => {
  const category = req.category;
  await category.remove();
  return res.json({ category });
};

export default { list, create, read, update, remove, categoryById };
