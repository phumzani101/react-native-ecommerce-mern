import UserModel from "../models/UserModel.js";

const list = async (req, res) => {
  const users = await UserModel.find();
  return res.json({ users });
};

const create = async (req, res) => {
  const user = await UserModel.create(req.body);
  return res.json({ user });
};

const userById = async (req, res, next, id) => {
  const user = await UserModel.findById(id);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  req.user = user;
  return next();
};

const read = (req, res) => {
  const user = req.user;
  return res.json({ user });
};

const update = (req, res) => {
  const user = req.user;
  return res.json({ user });
};

const remove = async (req, res) => {
  const user = req.user;
  await user.remove();
  return res.json({ user });
};

export default { list, create, read, update, remove, userById };
