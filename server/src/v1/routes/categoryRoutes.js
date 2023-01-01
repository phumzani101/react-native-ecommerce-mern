import express from "express";
import categoryController from "../controllers/categoryController.js";
const router = express.Router();

router.route("/").get(categoryController.list).post(categoryController.create);
router
  .route("/:categoryId")
  .get(categoryController.read)
  .put(categoryController.update)
  .delete(categoryController.remove);

export default router;
