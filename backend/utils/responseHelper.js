const { ApiError } = require("./apiError");

/**
 * Handles error responses consistently across all controllers.
 * @param {Object} res - Express response object
 * @param {Object} error - Error object (instance of ApiError or native Error)
 */
const sendErrorResponse = (res, error) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error.message || "An unexpected error occurred";
  const errors = error.errors || [];
  return res.status(statusCode).json({
    statusCode,
    data: null,
    success: false,
    message,
    errors,
  });
};

module.exports = { sendErrorResponse };
