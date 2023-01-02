import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import CategoryModel from "../models/CategoryModel.js";

const list = catchAsyncErrors(async (req, res, next) => {
  const categories = await CategoryModel.find();
  return res.json({ categories });
});

const create = catchAsyncErrors(async (req, res, next) => {
  const category = await CategoryModel.create(req.body);
  return res.json({ category });
});

const categoryById = catchAsyncErrors(async (req, res, next, id) => {
  if (!CategoryModel.isValidId(id)) {
    return next(new ErrorHelper("Category ID not Valid", 400));
  }

  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ErrorHelper("Category not found", 404));
  }
  req.category = category;
  return next();
});

const read = catchAsyncErrors(async (req, res, next) => {
  const category = req.category;
  return res.json({ category });
});

const update = catchAsyncErrors(async (req, res, next) => {
  let category = req.category;
  category = _.extend(category, req.body);
  await category.save();
  return res.json({ category });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const category = req.category;
  await category.remove();
  return res.json({ category });
});

export default { list, create, read, update, remove, categoryById };
