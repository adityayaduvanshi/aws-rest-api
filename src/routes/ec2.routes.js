const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ec2.controller');

/**
 * @swagger
 * tags:
 *   name: EC2
 *   description: Amazon EC2 instance operations
 */

/**
 * @swagger
 * /ec2/instances:
 *   get:
 *     summary: List all EC2 instances
 *     tags: [EC2]
 */
router.get('/instances', ctrl.listInstances);

/**
 * @swagger
 * /ec2/instances/{instanceId}:
 *   get:
 *     summary: Get details of a specific instance
 *     tags: [EC2]
 *     parameters:
 *       - in: path
 *         name: instanceId
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/instances/:instanceId', ctrl.getInstance);

/**
 * @swagger
 * /ec2/instances/{instanceId}/start:
 *   post:
 *     summary: Start an EC2 instance
 *     tags: [EC2]
 */
router.post('/instances/:instanceId/start', ctrl.startInstance);

/**
 * @swagger
 * /ec2/instances/{instanceId}/stop:
 *   post:
 *     summary: Stop an EC2 instance
 *     tags: [EC2]
 */
router.post('/instances/:instanceId/stop', ctrl.stopInstance);

/**
 * @swagger
 * /ec2/instances/{instanceId}/terminate:
 *   post:
 *     summary: Terminate an EC2 instance (irreversible)
 *     tags: [EC2]
 */
router.post('/instances/:instanceId/terminate', ctrl.terminateInstance);

module.exports = router;
