const sendSuccess = (res, data = null, statusCode = 200, message = 'Success') => {
  res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, message = 'Internal server error', statusCode = 500, code = null) => {
  const payload = { success: false, message };
  if (code) payload.code = code;
  res.status(statusCode).json(payload);
};

module.exports = { sendSuccess, sendError };
