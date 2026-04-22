const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ebs.controller');

/**
 * @swagger
 * tags:
 *   name: EBS
 *   description: Amazon EBS snapshot and volume operations
 */

/**
 * @swagger
 * /ebs/volumes:
 *   get:
 *     summary: List all EBS volumes
 *     tags: [EBS]
 */
router.get('/volumes', ctrl.listVolumes);

/**
 * @swagger
 * /ebs/snapshots:
 *   get:
 *     summary: List EBS snapshots
 *     tags: [EBS]
 *     parameters:
 *       - in: query
 *         name: owned
 *         schema:
 *           type: boolean
 *         description: Filter to only snapshots owned by caller (default true)
 *   post:
 *     summary: Create a snapshot from a volume
 *     tags: [EBS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [volumeId]
 *             properties:
 *               volumeId:
 *                 type: string
 *               description:
 *                 type: string
 */
router.get('/snapshots', ctrl.listSnapshots);
router.post('/snapshots', ctrl.createSnapshot);

/**
 * @swagger
 * /ebs/snapshots/{snapshotId}:
 *   delete:
 *     summary: Delete a snapshot
 *     tags: [EBS]
 *     parameters:
 *       - in: path
 *         name: snapshotId
 *         required: true
 *         schema:
 *           type: string
 */
router.delete('/snapshots/:snapshotId', ctrl.deleteSnapshot);

module.exports = router;
