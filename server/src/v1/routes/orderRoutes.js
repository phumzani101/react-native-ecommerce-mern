import express from "express";
import orderController from "../controllers/orderController.js";
const router = express.Router();

router.route("/").get(orderController.list).post(orderController.create);
router
  .route("/:orderId")
  .get(orderController.read)
  .put(orderController.update)
  .delete(orderController.remove);

router.param("orderId", orderController.orderById);

export default router;
