import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(userController.list).post(userController.create);
router.get("/count", userController.count);
router
  .route("/:userId")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param("userId", userController.userById);

export default router;
