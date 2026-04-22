const express = require('express');
const multer = require('multer');
const router = express.Router();
const ctrl = require('../controllers/glacier.controller');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 * 1024 } });

/**
 * @swagger
 * tags:
 *   name: Glacier
 *   description: Amazon Glacier vault and archive operations
 */

/**
 * @swagger
 * /glacier/vaults:
 *   get:
 *     summary: List all Glacier vaults
 *     tags: [Glacier]
 *   post:
 *     summary: Create a new vault
 *     tags: [Glacier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [vaultName]
 *             properties:
 *               vaultName:
 *                 type: string
 */
router.get('/vaults', ctrl.listVaults);
router.post('/vaults', ctrl.createVault);

/**
 * @swagger
 * /glacier/vaults/{vaultName}:
 *   delete:
 *     summary: Delete a vault
 *     tags: [Glacier]
 */
router.delete('/vaults/:vaultName', ctrl.deleteVault);

/**
 * @swagger
 * /glacier/vaults/{vaultName}/archives:
 *   post:
 *     summary: Upload an archive to a vault
 *     tags: [Glacier]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               description:
 *                 type: string
 */
router.post('/vaults/:vaultName/archives', upload.single('file'), ctrl.uploadArchive);

/**
 * @swagger
 * /glacier/vaults/{vaultName}/archives/{archiveId}:
 *   delete:
 *     summary: Delete an archive from a vault
 *     tags: [Glacier]
 */
router.delete('/vaults/:vaultName/archives/:archiveId', ctrl.deleteArchive);

/**
 * @swagger
 * /glacier/vaults/{vaultName}/jobs:
 *   get:
 *     summary: List jobs for a vault
 *     tags: [Glacier]
 *   post:
 *     summary: Initiate an archive retrieval job
 *     tags: [Glacier]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               archiveId:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [archive-retrieval, inventory-retrieval]
 */
router.get('/vaults/:vaultName/jobs', ctrl.listJobs);
router.post('/vaults/:vaultName/jobs', ctrl.initiateJob);

module.exports = router;
