const { S3Client } = require('@aws-sdk/client-s3');
const { EC2Client } = require('@aws-sdk/client-ec2');
const { LambdaClient } = require('@aws-sdk/client-lambda');
const { GlacierClient } = require('@aws-sdk/client-glacier');

const baseConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const s3Client = new S3Client(baseConfig);
const ec2Client = new EC2Client(baseConfig);
const lambdaClient = new LambdaClient(baseConfig);
const glacierClient = new GlacierClient(baseConfig);

module.exports = { s3Client, ec2Client, lambdaClient, glacierClient };
