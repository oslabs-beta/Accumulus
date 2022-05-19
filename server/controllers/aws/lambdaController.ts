import 'dotenv/config';
import express from 'express';
import lambda from '@aws-sdk/client-lambda';
import * as types from '../../types';

const lambdaController: any = {};
// const lambdaController: Record<string, types.middlewareFunction> = {};

interface LambdaFunctionResponse {
  name: string;
  description: string;
  architectures: string[];
  size: number;
  memoryAllocated: number;
  ephemeral: object;
  timeout: number;
  lastModified: string;
}

lambdaController.getFunctions = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const client = new lambda.LambdaClient({
    region,
    credentials,
  });
  const iam = { FunctionVersion: 'ALL' };

  // Send request to get all lambda funcs in account for region
  try {
    const listOfLambdaFuncs = client
      .send(new lambda.ListFunctionsCommand(iam))
      .then((data) => {
        if (typeof data.Functions === 'object') {
          const filteredFunctions = data.Functions.filter((el) => el.FunctionName !== 'InvokeLambdaFuncs')
          res.locals.funcNames = filteredFunctions.map((el) => el.FunctionName);
          res.locals.toBeCached = res.locals.funcNames;
          let funcData = [];
          for (let i = 0; i < filteredFunctions.length; i++) {
            const formattedResponse: LambdaFunctionResponse = {
              name: filteredFunctions[i].FunctionName!,
              description: filteredFunctions[i].Description!,
              architectures: filteredFunctions[i].Architectures!,
              size: filteredFunctions[i].CodeSize!, // (in bytes)
              memoryAllocated: filteredFunctions[i].MemorySize!, // (in MB)
              ephemeral: filteredFunctions[i].EphemeralStorage!, // (in MB)
              timeout: filteredFunctions[i].Timeout!,
              lastModified: filteredFunctions[i].LastModified!,
            };
            funcData.push(formattedResponse);
          }
          res.locals.lambdaFunctions = funcData;
        }
        return next();
      });
  } catch (err) {
    return next(err);
  }
};

lambdaController.metrics = {
  invocations: 'Invocations',
  duration: 'Duration',
  errors: 'Errors',
  throttles: 'Throttles',
  concurrency: 'Concurrency',
};

export default lambdaController;
