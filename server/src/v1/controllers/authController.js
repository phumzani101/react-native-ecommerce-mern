import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/UserModel.js";

const currentUser = catchAsyncErrors(async (req, res, next) => {
  const user = await UserModel.findById(req.auth.id);
  return res.json({ user });
});

const signup = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // check if user is already registered
  let user = await UserModel.findOne({ email });
  console.log(user);
  if (user) {
    return next(new ErrorHelper("User is already registered", 400));
  }

  // register user
  user = new UserModel({ email, password });
  user = await user.save();
  return res.json({ user });
});

const signin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // check if user is not registered
  let user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHelper("User not found, please register", 404));
  }

  if (!user.authenticate(password)) {
    return next(new ErrorHelper("Invalid password, please try again", 400));
  }

  const token = user.createJWT();

  user.password = undefined;
  return res.json({ user, token });
});

const update = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  return res.json({ user });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  await user.remove();
  return res.json({ user });
});

export default { currentUser, signup, signin, update, remove };
