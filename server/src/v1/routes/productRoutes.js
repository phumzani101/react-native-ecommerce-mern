import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router.route("/").get(productController.list).post(productController.create);
router
  .route("/:productId")
  .get(productController.read)
  .put(productController.update)
  .delete(productController.remove);

export default router;
