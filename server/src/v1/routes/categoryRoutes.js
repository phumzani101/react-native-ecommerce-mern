import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(categoryController.list)
  .post(authMiddleware.isAuth, categoryController.create);
router
  .route("/:categoryId")
  .get(categoryController.read)
  .put(authMiddleware.isAuth, categoryController.update)
  .delete(authMiddleware.isAuth, categoryController.remove);

router.param("categoryId", categoryController.categoryById);

export default router;
