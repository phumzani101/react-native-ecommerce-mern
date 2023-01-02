import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.use(authMiddleware.isAuth);
router.route("/").get(userController.list).post(userController.create);
router.get("/count", userController.count);
router
  .route("/:userId")
  .get(userController.read)
  .put(authMiddleware.isAuth, userController.update)
  .delete(userController.remove);

router.param("userId", userController.userById);

export default router;
