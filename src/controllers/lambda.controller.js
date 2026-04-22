const lambdaService = require('../services/lambda.service');
const { sendSuccess, sendError } = require('../utils/response');

const listFunctions = async (req, res, next) => {
  try {
    const functions = await lambdaService.listFunctions();
    sendSuccess(res, { functions, count: functions.length });
  } catch (err) {
    next(err);
  }
};

const getFunction = async (req, res, next) => {
  try {
    const fn = await lambdaService.getFunction(req.params.functionName);
    sendSuccess(res, fn);
  } catch (err) {
    next(err);
  }
};

const invokeFunction = async (req, res, next) => {
  try {
    const result = await lambdaService.invokeFunction(
      req.params.functionName,
      req.body.payload || {},
      req.body.invocationType
    );
    sendSuccess(res, result, 200, 'Function invoked');
  } catch (err) {
    next(err);
  }
};

const deployFunction = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 'No zip file provided', 400);
    const { functionName, runtime, role, handler, description, environment } = req.body;
    if (!functionName) return sendError(res, 'functionName is required', 400);

    const result = await lambdaService.deployFunction({
      functionName,
      runtime,
      role,
      handler,
      zipBuffer: req.file.buffer,
      description,
      environment: environment ? JSON.parse(environment) : null,
    });

    const statusCode = result.action === 'created' ? 201 : 200;
    sendSuccess(res, result, statusCode, `Function ${result.action} successfully`);
  } catch (err) {
    next(err);
  }
};

const deleteFunction = async (req, res, next) => {
  try {
    await lambdaService.deleteFunction(req.params.functionName);
    sendSuccess(res, null, 200, 'Function deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = { listFunctions, getFunction, invokeFunction, deployFunction, deleteFunction };
