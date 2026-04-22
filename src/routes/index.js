const express = require('express');
const router = express.Router();

router.use('/s3', require('./s3.routes'));
router.use('/ebs', require('./ebs.routes'));
router.use('/glacier', require('./glacier.routes'));
router.use('/ec2', require('./ec2.routes'));
router.use('/lambda', require('./lambda.routes'));

module.exports = router;
