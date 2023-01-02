import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  destination: function (req, file, cb) {
    cb(null, "/public/uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router
  .route("/")
  .get(productController.list)
  .post(
    authMiddleware.isAuth,
    upload.array("images"),
    productController.create
  );
router.get("/count", productController.count);

// /api/v1/products/featured?limit=5
router.get("/featured", productController.featured);
router
  .route("/:productId")
  .get(productController.read)
  .put(authMiddleware.isAuth, productController.update)
  .delete(authMiddleware.isAuth, productController.remove);

router.param("productId", productController.productById);

export default router;
