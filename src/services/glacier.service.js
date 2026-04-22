const {
  ListVaultsCommand,
  CreateVaultCommand,
  DeleteVaultCommand,
  UploadArchiveCommand,
  DeleteArchiveCommand,
  InitiateJobCommand,
  ListJobsCommand,
} = require('@aws-sdk/client-glacier');
const { glacierClient } = require('../config/aws');

const ACCOUNT_ID = '-'; // '-' resolves to the caller's AWS account

const listVaults = async () => {
  const data = await glacierClient.send(new ListVaultsCommand({ accountId: ACCOUNT_ID }));
  return data.VaultList;
};

const createVault = async (vaultName) => {
  return glacierClient.send(new CreateVaultCommand({ accountId: ACCOUNT_ID, vaultName }));
};

const deleteVault = async (vaultName) => {
  return glacierClient.send(new DeleteVaultCommand({ accountId: ACCOUNT_ID, vaultName }));
};

const uploadArchive = async (vaultName, body, description = '') => {
  return glacierClient.send(
    new UploadArchiveCommand({ accountId: ACCOUNT_ID, vaultName, body, archiveDescription: description })
  );
};

const deleteArchive = async (vaultName, archiveId) => {
  return glacierClient.send(
    new DeleteArchiveCommand({ accountId: ACCOUNT_ID, vaultName, archiveId })
  );
};

const initiateJob = async (vaultName, archiveId, type = 'archive-retrieval') => {
  return glacierClient.send(
    new InitiateJobCommand({
      accountId: ACCOUNT_ID,
      vaultName,
      jobParameters: {
        Type: type,
        ...(archiveId && { ArchiveId: archiveId }),
      },
    })
  );
};

const listJobs = async (vaultName) => {
  const data = await glacierClient.send(
    new ListJobsCommand({ accountId: ACCOUNT_ID, vaultName })
  );
  return data.JobList;
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
