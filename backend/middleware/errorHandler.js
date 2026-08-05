const errorHandler = (err, req, res, next) => {
  console.error('Centralized Error Handler Logging:', err);

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = err.errors || null;

  // Mongoose duplicate key error (SKU already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field.toUpperCase()} already exists`,
      errors: [{ [field]: `${field.toUpperCase()} is already in use` }],
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errorList = Object.values(err.errors).map((val) => ({
      [val.path]: val.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: errorList,
    });
  }

  // Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      message: `Resource not found with id of ${err.value}`,
    });
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = errorHandler;
