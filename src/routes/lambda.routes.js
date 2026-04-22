const express = require('express');
const multer = require('multer');
const router = express.Router();
const ctrl = require('../controllers/lambda.controller');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

/**
 * @swagger
 * tags:
 *   name: Lambda
 *   description: AWS Lambda function operations
 */

/**
 * @swagger
 * /lambda/functions:
 *   get:
 *     summary: List all Lambda functions
 *     tags: [Lambda]
 *   post:
 *     summary: Deploy (create or update) a Lambda function
 *     tags: [Lambda]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [functionName, zip]
 *             properties:
 *               zip:
 *                 type: string
 *                 format: binary
 *               functionName:
 *                 type: string
 *               runtime:
 *                 type: string
 *                 example: nodejs20.x
 *               role:
 *                 type: string
 *               handler:
 *                 type: string
 *               description:
 *                 type: string
 *               environment:
 *                 type: string
 *                 description: JSON string of key-value env vars
 */
router.get('/functions', ctrl.listFunctions);
router.post('/functions', upload.single('zip'), ctrl.deployFunction);

/**
 * @swagger
 * /lambda/functions/{functionName}:
 *   get:
 *     summary: Get details of a Lambda function
 *     tags: [Lambda]
 *   delete:
 *     summary: Delete a Lambda function
 *     tags: [Lambda]
 */
router.get('/functions/:functionName', ctrl.getFunction);
router.delete('/functions/:functionName', ctrl.deleteFunction);

/**
 * @swagger
 * /lambda/functions/{functionName}/invoke:
 *   post:
 *     summary: Invoke a Lambda function
 *     tags: [Lambda]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               payload:
 *                 type: object
 *               invocationType:
 *                 type: string
 *                 enum: [RequestResponse, Event, DryRun]
 */
router.post('/functions/:functionName/invoke', ctrl.invokeFunction);

module.exports = router;
