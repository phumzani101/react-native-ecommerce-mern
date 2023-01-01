import express from "express";
import { check, validationResult } from "express-validator";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";
const router = express.Router();

// Signup Validator
const signupValidator = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("The name must have minimum length of 3")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Your password should have min and max length between 6-15"),
  // .matches(/\d/)
  // .withMessage("Your password should have at least one number")
  // .matches(/[!@#$%^&*(),.?":{}|<>]/)
  // .withMessage("Your password should have at least one sepcial character"),

  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log(req.body.password, req.body.confirmPassword);
      throw new Error("confirm password does not match");
    }
    return true;
  }),
];

// signin validation
const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  check("password").not().isEmpty().withMessage("Password is required"),
];

router.post(
  "/signup",
  signupValidator,
  validatorMiddleware,
  authController.signup
);
router.post(
  "/signin",
  signinValidator,
  validatorMiddleware,
  authController.signin
);

router.use(authMiddleware.isAuth);
router.get("/current-user", authController.currentUser);
router.post(authController.update);
router.post(authController.remove);

export default router;
