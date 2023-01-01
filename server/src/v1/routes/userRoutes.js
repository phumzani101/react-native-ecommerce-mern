import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(userController.list).post(userController.create);
router
  .route("/:userId")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

export default router;
