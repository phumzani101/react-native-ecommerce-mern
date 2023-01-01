import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(productController.list).post(productController.create);
router.get("/count", productController.count);

// /api/v1/products/featured?limit=5
router.get("/featured", productController.featured);
router
  .route("/:productId")
  .get(productController.read)
  .put(productController.update)
  .delete(productController.remove);

router.param("productId", productController.productById);

export default router;
