import express from "express";
import orderController from "../controllers/orderController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware.isAuth);
router.route("/").get(orderController.list).post(orderController.create);
router.get("/totalsales", orderController.totalsales);
router.get("/count", orderController.count);
router
  .route("/:orderId")
  .get(orderController.read)
  .put(orderController.update)
  .delete(orderController.remove);

router.param("orderId", orderController.orderById);

export default router;
