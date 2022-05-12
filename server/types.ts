import * as express from 'express';

// Types for Express
export type middlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

//Type for Incoming Data
export interface MemUsed{
  [key:string]: string | number,
};

// Types for Lambda API Response
// export type lambdaFunctionResponse = (

// ) => 