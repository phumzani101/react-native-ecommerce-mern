import config from "../../../config/index.js";

const getErrorMessage = (err) => {
  let message = "";
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = getUniqueErrorMessage(err);
        break;
      default:
        message = "Something went wrong";
    }
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldName = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

export const globalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // mongo errors
  if (err.name === "ValidationError") {
    err.isOperational = true;
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.name === "CastError") {
    err.isOperational = true;
    err.statusCode = 404;
    err.message = "Invalid id, resource not found";
  }

  if (err.code === 11000 || err.code === 11001) {
    err.isOperational = true;
    err.statusCode = 404;
    err.message = getUniqueErrorMessage(err);
  }

  // json web token Error
  if (err.name === "JsonWebTokenError") {
    err.isOperational = true;
    err.statusCode = 401;
    err.message = "Invalid auth token, please login again";
  }

  if (err.name === "TokenExpiredError") {
    err.isOperational = true;
    err.statusCode = 401;
    err.message = "Expired auth token, please login again";
  }

  if (err.name === "UnauthorizedError") {
    err.isOperational = true;
    err.statusCode = 401;
    err.message = err.message;
  }

  if (config.dev) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // not operational that we trust
  if (!err.isOperational) {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  // send generic message
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const catchAsyncErrors = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);
