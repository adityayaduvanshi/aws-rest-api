const { sendError } = require('../utils/response');

const AWS_ERROR_STATUS = {
  NoSuchBucket: 404,
  NoSuchKey: 404,
  BucketAlreadyExists: 409,
  BucketAlreadyOwnedByYou: 409,
  InvalidBucketName: 400,
  AccessDenied: 403,
  InvalidAccessKeyId: 401,
  SignatureDoesNotMatch: 401,
  ResourceNotFoundException: 404,
  InvalidParameterValueException: 400,
  ValidationException: 400,
  InvalidSnapshotState: 400,
};

const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);
  const statusCode = AWS_ERROR_STATUS[err.name] || err.$metadata?.httpStatusCode || 500;
  sendError(res, err.message, statusCode, err.name);
};

module.exports = { errorHandler };
