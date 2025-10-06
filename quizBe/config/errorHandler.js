// Promt >>

// error handler but simplified for Express + Sequelize (JS).
// Here’s the converted version (pure JavaScript, Sequelize-specific errors handled): =>  Database Error , Validation Error , Unique Constraint Error , Sequelize Foreign Key Constraint Error

const createError = (message, statusCode = 500) => ({
  message,
  statusCode,
});

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("CAUGHT YOUU HERE");
  let customError = createError(
    err.message || "Internal Server Error",
    err.statusCode || 500
  );

  if (err.name === "SequelizeValidationError") {
    customError = createError(err.errors.map(e => e.message).join(", "), 400);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    customError = createError(err.errors.map(e => e.message).join(", "), 400);
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    customError = createError(`Invalid reference: ${err.index}`, 400);
  }
  if (err.name === "SequelizeDatabaseError") {
    customError = createError(err.message || "Database error occurred", 500);
  }

  res.status(customError.statusCode).json({
    success: false,
    message: customError.message,
  });
};

const catchAsyncError = theFunc => {
  return (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export {errorHandlerMiddleware, catchAsyncError};
