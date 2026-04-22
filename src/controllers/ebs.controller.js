const ebsService = require('../services/ebs.service');
const { sendSuccess, sendError } = require('../utils/response');

const listSnapshots = async (req, res, next) => {
  try {
    const ownedByMe = req.query.owned !== 'false';
    const snapshots = await ebsService.listSnapshots(ownedByMe);
    sendSuccess(res, { snapshots, count: snapshots.length });
  } catch (err) {
    next(err);
  }
};

const createSnapshot = async (req, res, next) => {
  try {
    const { volumeId, description } = req.body;
    if (!volumeId) return sendError(res, 'volumeId is required', 400);
    const snapshot = await ebsService.createSnapshot(volumeId, description);
    sendSuccess(res, snapshot, 202, 'Snapshot creation initiated');
  } catch (err) {
    next(err);
  }
};

const deleteSnapshot = async (req, res, next) => {
  try {
    await ebsService.deleteSnapshot(req.params.snapshotId);
    sendSuccess(res, null, 200, 'Snapshot deleted successfully');
  } catch (err) {
    next(err);
  }
};

const listVolumes = async (req, res, next) => {
  try {
    const volumes = await ebsService.listVolumes();
    sendSuccess(res, { volumes, count: volumes.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { listSnapshots, createSnapshot, deleteSnapshot, listVolumes };
