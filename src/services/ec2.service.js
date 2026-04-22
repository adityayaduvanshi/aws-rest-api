const {
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  TerminateInstancesCommand,
} = require('@aws-sdk/client-ec2');
const { ec2Client } = require('../config/aws');

const listInstances = async () => {
  const data = await ec2Client.send(new DescribeInstancesCommand({}));
  return data.Reservations.flatMap((r) => r.Instances);
};

const getInstance = async (instanceId) => {
  const data = await ec2Client.send(
    new DescribeInstancesCommand({ InstanceIds: [instanceId] })
  );
  return data.Reservations[0]?.Instances[0] || null;
};

const startInstance = async (instanceId) => {
  const data = await ec2Client.send(new StartInstancesCommand({ InstanceIds: [instanceId] }));
  return data.StartingInstances[0];
};

const stopInstance = async (instanceId) => {
  const data = await ec2Client.send(new StopInstancesCommand({ InstanceIds: [instanceId] }));
  return data.StoppingInstances[0];
};

const terminateInstance = async (instanceId) => {
  const data = await ec2Client.send(new TerminateInstancesCommand({ InstanceIds: [instanceId] }));
  return data.TerminatingInstances[0];
};

module.exports = { listInstances, getInstance, startInstance, stopInstance, terminateInstance };
