import { cleanObject } from "../helpers/index.js";
import ProductModel from "../models/ProductModel.js";
import _ from "lodash";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import ErrorHelper from "../helpers/errorHelper.js";

// /api/listings/search?keyoword=i&price[gt]=1000&sort[price]=desc&sort[ratingsAverage]=asc
const list = catchAsyncErrors(async (req, res, next) => {
  const { keyword, sort, limit, page } = req.query;

  // query
  let queryObj = cleanObject({ ...req.query });
  let exclude = ["page", "sort", "limit", "fields", "keyword"];
  exclude.forEach((el) => delete queryObj[el]);

  // replace
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // toOject
  queryObj = JSON.parse(queryStr);

  const myCustomLabels = {
    totalDocs: "totalProducts",
    docs: "products",
  };

  const options = {
    page: page || 1,
    limit: limit || 12,
    sort: sort ? sort : { updatedAt: "desc" },
    customLabels: myCustomLabels,
  };

  if (keyword) {
    // query["$text"] = { $search: keyword };
    queryObj.name = { $regex: keyword, $options: "i" };
  }

  const productsPaginate = await ProductModel.paginate(queryObj, options);
  const products = productsPaginate.products;
  delete productsPaginate["products"];
  const meta = { ...productsPaginate };
  return res.json({ products, meta });
});

const create = catchAsyncErrors(async (req, res, next) => {
  let files = req.files && Object.values(req.files).flat();
  const {
    name,
    tagline,
    description,
    brand,
    price,
    category,
    user,
    countInStock,
    rating,
    numReviews,
    isFeatured,
  } = req.body;

  let product = new ProductModel({
    name,
    tagline,
    description,
    brand,
    price,
    category,
    user,
    countInStock,
    rating,
    numReviews,
    isFeatured,
    user: req.auth._id,
  });

  if (files && files?.length !== 0) {
    console.log("files", files);
    let images = files.map((img) => {
      let path = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      return path;
    });
    product.images.push(...images);
  }

  product = await product.save();
  return res.json({ product });
});

const productById = catchAsyncErrors(async (req, res, next, id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new ErrorHelper("Product not found", 404));
  }
  req.product = product;
  return next();
});

const read = catchAsyncErrors(async (req, res, next) => {
  const product = req.product;
  return res.json({ product });
});

const update = catchAsyncErrors(async (req, res, next) => {
  let product = req.product;
  product = _.extend(product, req.body);
  if (files && files?.length !== 0) {
    console.log("files", files);
    let images = files.map((img) => {
      let path = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
      return path;
    });
    product.images.push(...images);
  }
  await product.save();
  return res.json({ product });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const product = req.product;
  await product.remove();
  return res.json({ product });
});

const count = catchAsyncErrors(async (req, res, next) => {
  const productCount = await ProductModel.countDocuments();
  return res.json({ productCount });
});

// GET /api/v1/products/featured?limit=5
const featured = catchAsyncErrors(async (req, res, next) => {
  const { limit = 5 } = req.query;
  const products = await ProductModel.find({ isFeatured: true })
    .limit(+limit)
    .lean();
  return res.json({ products });
});

export default {
  list,
  create,
  read,
  update,
  remove,
  productById,
  count,
  featured,
};
