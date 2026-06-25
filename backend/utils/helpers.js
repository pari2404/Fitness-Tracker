// Pagination helper
const getPaginationParams = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

// Response formatter
const sendSuccess = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...data
  });
};

const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    error
  });
};

module.exports = {
  getPaginationParams,
  sendSuccess,
  sendError
};
