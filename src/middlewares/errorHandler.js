import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  // Log the error first
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    user: req.user ? { id: req.user._id, role: req.user.role } : "Guest",
    timestamp: new Date().toISOString()
  });

  // 🔥 Handle Mongo duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
      field: err.keyValue,
    });
  }

  // General errors
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
