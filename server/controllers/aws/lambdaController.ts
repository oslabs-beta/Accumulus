import 'dotenv/config';
import express from 'express';
import lambda from '@aws-sdk/client-lambda';
import * as types from '../../types';

const lambdaController: any = {};
// const lambdaController: Record<string, types.middlewareFunction> = {};

interface LambdaFunctionResponse {
  name: string;
  description: string;
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
          res.locals.funcNames = data.Functions.map((el) => el.FunctionName);
          let funcData = [];
          for (let i = 0; i < data.Functions.length; i++) {
            const formattedResponse: LambdaFunctionResponse = {
              name: data.Functions[i].FunctionName!,
              description: data.Functions[i].Description!,
              size: data.Functions[i].CodeSize!, // (in bytes)
              memoryAllocated: data.Functions[i].MemorySize!, // (in MB)
              ephemeral: data.Functions[i].EphemeralStorage!, // (in MB)
              timeout: data.Functions[i].Timeout!,
              lastModified: data.Functions[i].LastModified!,
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
