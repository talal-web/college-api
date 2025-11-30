import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    user: req.user ? { id: req.user._id, role: req.user.role } : "Guest",
    timestamp: new Date().toISOString()
  });

  res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};

export default errorHandler;
