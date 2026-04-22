const {
  ListBucketsCommand,
  CreateBucketCommand,
  DeleteBucketCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutBucketVersioningCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client } = require('../config/aws');

const listBuckets = async () => {
  const data = await s3Client.send(new ListBucketsCommand({}));
  return data.Buckets;
};

const createBucket = async (bucketName, region) => {
  const params = { Bucket: bucketName };
  if (region && region !== 'us-east-1') {
    params.CreateBucketConfiguration = { LocationConstraint: region };
  }
  return s3Client.send(new CreateBucketCommand(params));
};

const deleteBucket = async (bucketName) => {
  return s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
};

const listObjects = async (bucketName, prefix = '', maxKeys = 100) => {
  const data = await s3Client.send(
    new ListObjectsV2Command({ Bucket: bucketName, Prefix: prefix, MaxKeys: maxKeys })
  );
  return data.Contents || [];
};

const uploadObject = async (bucketName, key, body, contentType) => {
  return s3Client.send(
    new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body, ContentType: contentType })
  );
};

const getObject = async (bucketName, key) => {
  return s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: key }));
};

const deleteObject = async (bucketName, key) => {
  return s3Client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
};

const getPresignedUrl = async (bucketName, key, expiresIn = 3600) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn });
};

const setVersioning = async (bucketName, enabled) => {
  return s3Client.send(
    new PutBucketVersioningCommand({
      Bucket: bucketName,
      VersioningConfiguration: { Status: enabled ? 'Enabled' : 'Suspended' },
    })
  );
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
