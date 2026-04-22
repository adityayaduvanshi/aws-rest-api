const {
  DescribeSnapshotsCommand,
  CreateSnapshotCommand,
  DeleteSnapshotCommand,
  DescribeVolumesCommand,
} = require('@aws-sdk/client-ec2');
const { ec2Client } = require('../config/aws');

const listSnapshots = async (ownedByMe = true) => {
  const params = ownedByMe ? { OwnerIds: ['self'] } : {};
  const data = await ec2Client.send(new DescribeSnapshotsCommand(params));
  return data.Snapshots;
};

const createSnapshot = async (volumeId, description = '') => {
  return ec2Client.send(
    new CreateSnapshotCommand({ VolumeId: volumeId, Description: description })
  );
};

const deleteSnapshot = async (snapshotId) => {
  return ec2Client.send(new DeleteSnapshotCommand({ SnapshotId: snapshotId }));
};

const listVolumes = async () => {
  const data = await ec2Client.send(new DescribeVolumesCommand({}));
  return data.Volumes;
};

module.exports = { listSnapshots, createSnapshot, deleteSnapshot, listVolumes };
