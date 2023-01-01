import { validationResult } from "express-validator";

const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    error: extractedErrors.join(", "),
  });
};

export default validatorMiddleware;
