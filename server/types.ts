import * as express from 'express';

// Types for Express
export type middlewareFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;
