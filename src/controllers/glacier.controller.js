const glacierService = require('../services/glacier.service');
const { sendSuccess, sendError } = require('../utils/response');

const listVaults = async (req, res, next) => {
  try {
    const vaults = await glacierService.listVaults();
    sendSuccess(res, { vaults, count: vaults.length });
  } catch (err) {
    next(err);
  }
};

const createVault = async (req, res, next) => {
  try {
    const { vaultName } = req.body;
    if (!vaultName) return sendError(res, 'vaultName is required', 400);
    await glacierService.createVault(vaultName);
    sendSuccess(res, { vaultName }, 201, 'Vault created successfully');
  } catch (err) {
    next(err);
  }
};

const deleteVault = async (req, res, next) => {
  try {
    await glacierService.deleteVault(req.params.vaultName);
    sendSuccess(res, null, 200, 'Vault deleted successfully');
  } catch (err) {
    next(err);
  }
};

const uploadArchive = async (req, res, next) => {
  try {
    if (!req.file) return sendError(res, 'No file provided', 400);
    const result = await glacierService.uploadArchive(
      req.params.vaultName,
      req.file.buffer,
      req.body.description
    );
    sendSuccess(res, { archiveId: result.archiveId, checksum: result.checksum }, 201, 'Archive uploaded successfully');
  } catch (err) {
    next(err);
  }
};

const deleteArchive = async (req, res, next) => {
  try {
    await glacierService.deleteArchive(req.params.vaultName, req.params.archiveId);
    sendSuccess(res, null, 200, 'Archive deleted successfully');
  } catch (err) {
    next(err);
  }
};

const initiateJob = async (req, res, next) => {
  try {
    const { archiveId, type } = req.body;
    const result = await glacierService.initiateJob(req.params.vaultName, archiveId, type);
    sendSuccess(res, { jobId: result.jobId, location: result.location }, 202, 'Job initiated');
  } catch (err) {
    next(err);
  }
};

const listJobs = async (req, res, next) => {
  try {
    const jobs = await glacierService.listJobs(req.params.vaultName);
    sendSuccess(res, { jobs, count: jobs.length });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listVaults,
  createVault,
  deleteVault,
  uploadArchive,
  deleteArchive,
  initiateJob,
  listJobs,
};
