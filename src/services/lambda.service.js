const {
  ListFunctionsCommand,
  GetFunctionCommand,
  InvokeCommand,
  CreateFunctionCommand,
  UpdateFunctionCodeCommand,
  DeleteFunctionCommand,
} = require('@aws-sdk/client-lambda');
const { lambdaClient } = require('../config/aws');

const listFunctions = async () => {
  const data = await lambdaClient.send(new ListFunctionsCommand({}));
  return data.Functions;
};

const getFunction = async (functionName) => {
  return lambdaClient.send(new GetFunctionCommand({ FunctionName: functionName }));
};

const invokeFunction = async (functionName, payload = {}, invocationType = 'RequestResponse') => {
  const data = await lambdaClient.send(
    new InvokeCommand({
      FunctionName: functionName,
      Payload: JSON.stringify(payload),
      InvocationType: invocationType,
    })
  );
  return {
    statusCode: data.StatusCode,
    payload: data.Payload ? JSON.parse(Buffer.from(data.Payload).toString()) : null,
    logResult: data.LogResult ? Buffer.from(data.LogResult, 'base64').toString() : null,
  };
};

const deployFunction = async ({ functionName, runtime, role, handler, zipBuffer, description, environment }) => {
  try {
    await lambdaClient.send(
      new UpdateFunctionCodeCommand({ FunctionName: functionName, ZipFile: zipBuffer })
    );
    return { action: 'updated', functionName };
  } catch (err) {
    if (err.name !== 'ResourceNotFoundException') throw err;
  }

  await lambdaClient.send(
    new CreateFunctionCommand({
      FunctionName: functionName,
      Runtime: runtime,
      Role: role,
      Handler: handler,
      Code: { ZipFile: zipBuffer },
      Description: description,
      Environment: environment ? { Variables: environment } : undefined,
    })
  );
  return { action: 'created', functionName };
};

const deleteFunction = async (functionName) => {
  return lambdaClient.send(new DeleteFunctionCommand({ FunctionName: functionName }));
};

module.exports = { listFunctions, getFunction, invokeFunction, deployFunction, deleteFunction };
