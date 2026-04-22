const ec2Service = require('../services/ec2.service');
const { sendSuccess, sendError } = require('../utils/response');

const listInstances = async (req, res, next) => {
  try {
    const instances = await ec2Service.listInstances();
    sendSuccess(res, { instances, count: instances.length });
  } catch (err) {
    next(err);
  }
};

const getInstance = async (req, res, next) => {
  try {
    const instance = await ec2Service.getInstance(req.params.instanceId);
    if (!instance) return sendError(res, 'Instance not found', 404);
    sendSuccess(res, instance);
  } catch (err) {
    next(err);
  }
};

const startInstance = async (req, res, next) => {
  try {
    const result = await ec2Service.startInstance(req.params.instanceId);
    sendSuccess(res, result, 200, 'Instance start initiated');
  } catch (err) {
    next(err);
  }
};

const stopInstance = async (req, res, next) => {
  try {
    const result = await ec2Service.stopInstance(req.params.instanceId);
    sendSuccess(res, result, 200, 'Instance stop initiated');
  } catch (err) {
    next(err);
  }
};

const terminateInstance = async (req, res, next) => {
  try {
    const result = await ec2Service.terminateInstance(req.params.instanceId);
    sendSuccess(res, result, 200, 'Instance termination initiated');
  } catch (err) {
    next(err);
  }
};

module.exports = { listInstances, getInstance, startInstance, stopInstance, terminateInstance };
