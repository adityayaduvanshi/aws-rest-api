const express = require('express');
const multer = require('multer');
const router = express.Router();
const ctrl = require('../controllers/s3.controller');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } });

/**
 * @swagger
 * tags:
 *   name: S3
 *   description: Amazon S3 bucket and object operations
 */

/**
 * @swagger
 * /s3/buckets:
 *   get:
 *     summary: List all S3 buckets
 *     tags: [S3]
 *     responses:
 *       200:
 *         description: List of buckets
 *   post:
 *     summary: Create a new S3 bucket
 *     tags: [S3]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bucketName]
 *             properties:
 *               bucketName:
 *                 type: string
 *               region:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bucket created
 */
router.get('/buckets', ctrl.listBuckets);
router.post('/buckets', ctrl.createBucket);

/**
 * @swagger
 * /s3/buckets/{bucketName}:
 *   delete:
 *     summary: Delete an S3 bucket
 *     tags: [S3]
 *     parameters:
 *       - in: path
 *         name: bucketName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bucket deleted
 */
router.delete('/buckets/:bucketName', ctrl.deleteBucket);

/**
 * @swagger
 * /s3/buckets/{bucketName}/objects:
 *   get:
 *     summary: List objects in a bucket
 *     tags: [S3]
 *     parameters:
 *       - in: path
 *         name: bucketName
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: prefix
 *         schema:
 *           type: string
 *       - in: query
 *         name: maxKeys
 *         schema:
 *           type: integer
 *   post:
 *     summary: Upload an object to a bucket
 *     tags: [S3]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               key:
 *                 type: string
 */
router.get('/buckets/:bucketName/objects', ctrl.listObjects);
router.post('/buckets/:bucketName/objects', upload.single('file'), ctrl.uploadObject);

/**
 * @swagger
 * /s3/buckets/{bucketName}/object:
 *   get:
 *     summary: Download an object (use ?key=path/to/file)
 *     tags: [S3]
 *   delete:
 *     summary: Delete an object (use ?key=path/to/file)
 *     tags: [S3]
 */
router.get('/buckets/:bucketName/object', ctrl.getObject);
router.delete('/buckets/:bucketName/object', ctrl.deleteObject);

/**
 * @swagger
 * /s3/buckets/{bucketName}/presign:
 *   get:
 *     summary: Generate a presigned URL (use ?key=path/to/file&expiresIn=3600)
 *     tags: [S3]
 */
router.get('/buckets/:bucketName/presign', ctrl.getPresignedUrl);

/**
 * @swagger
 * /s3/buckets/{bucketName}/versioning:
 *   put:
 *     summary: Enable or suspend bucket versioning
 *     tags: [S3]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 */
router.put('/buckets/:bucketName/versioning', ctrl.setVersioning);

module.exports = router;
