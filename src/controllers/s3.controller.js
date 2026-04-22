const s3Service = require('../services/s3.service');
const { sendSuccess, sendError } = require('../utils/response');

const listBuckets = async (req, res, next) => {
  try {
    const buckets = await s3Service.listBuckets();
    sendSuccess(res, { buckets, count: buckets.length });
  } catch (err) {
    next(err);
  }
};

const createBucket = async (req, res, next) => {
  try {
    const { bucketName, region } = req.body;
    if (!bucketName) return sendError(res, 'bucketName is required', 400);
    const result = await s3Service.createBucket(bucketName, region || process.env.AWS_REGION);
    sendSuccess(res, { bucketName, location: result.Location }, 201, 'Bucket created successfully');
  } catch (err) {
    next(err);
  }
};

const deleteBucket = async (req, res, next) => {
  try {
    await s3Service.deleteBucket(req.params.bucketName);
    sendSuccess(res, null, 200, 'Bucket deleted successfully');
  } catch (err) {
    next(err);
  }
};

const listObjects = async (req, res, next) => {
  try {
    const { prefix, maxKeys } = req.query;
    const objects = await s3Service.listObjects(
      req.params.bucketName,
      prefix,
      parseInt(maxKeys) || 100
    );
    sendSuccess(res, { objects, count: objects.length });
  } catch (err) {
    next(err);
  }
};

const uploadObject = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 'No file provided', 400);
    const key = req.body.key || req.file.originalname;
    await s3Service.uploadObject(req.params.bucketName, key, req.file.buffer, req.file.mimetype);
    sendSuccess(res, { key, bucket: req.params.bucketName }, 201, 'Object uploaded successfully');
  } catch (err) {
    next(err);
  }
};

const getObject = async (req, res, next) => {
  try {
    const key = req.query.key;
    if (!key) return sendError(res, 'key query param is required', 400);
    const result = await s3Service.getObject(req.params.bucketName, key);
    res.set('Content-Type', result.ContentType || 'application/octet-stream');
    if (result.ContentLength) res.set('Content-Length', result.ContentLength);
    result.Body.pipe(res);
  } catch (err) {
    next(err);
  }
};

const deleteObject = async (req, res, next) => {
  try {
    const key = req.query.key;
    if (!key) return sendError(res, 'key query param is required', 400);
    await s3Service.deleteObject(req.params.bucketName, key);
    sendSuccess(res, null, 200, 'Object deleted successfully');
  } catch (err) {
    next(err);
  }
};

const getPresignedUrl = async (req, res, next) => {
  try {
    const key = req.query.key;
    if (!key) return sendError(res, 'key query param is required', 400);
    const expiresIn = parseInt(req.query.expiresIn) || 3600;
    const url = await s3Service.getPresignedUrl(req.params.bucketName, key, expiresIn);
    sendSuccess(res, { url, expiresIn });
  } catch (err) {
    next(err);
  }
};

const setVersioning = async (req, res, next) => {
  try {
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') return sendError(res, 'enabled (boolean) is required', 400);
    await s3Service.setVersioning(req.params.bucketName, enabled);
    sendSuccess(res, null, 200, `Versioning ${enabled ? 'enabled' : 'suspended'}`);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listBuckets,
  createBucket,
  deleteBucket,
  listObjects,
  uploadObject,
  getObject,
  deleteObject,
  getPresignedUrl,
  setVersioning,
};
