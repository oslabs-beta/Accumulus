import express, { Response, Request, NextFunction } from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
import costController from '../controllers/aws/costController';
import logController from '../controllers/aws/logController';
import stepController from '../controllers/aws/stepFuncs/stepController';
import cookieController from '../controllers/cookieController';
import analysisController from '../controllers/aws/analysisController';
// import * as types from '../types';

const router = express.Router();

// TODO: Need /lambdaSingleFunc and /lambdaAllFunc for cost routes

router.post(
  '/lambda',
  cookieController.getCookieCredentials,
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  (req: express.Request, res: express.Response) => {
    // console.log('SHOULD SHOW COOKIES HERE:', req.cookies)
    res.status(200).json(res.locals.lambdaFunctions);
  }
);

router.post(
  '/metricsAllFuncs/:metric/:period/:stat',
  cookieController.getCookieCredentials, //
  credController.getCreds, // credentials go into res.locals.credentials,
  cwController.getLambdaMetricsAll,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

router.post(
  '/metricsByFunc/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds, // credentials go into res.locals.credentials,
  lambdaController.getFunctions,
  cwController.getMetricsByFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.metricByFuncData);
  }
);

router.post(
  '/rankFuncsByMetric/:metric/:period/:stat',
  cookieController.getCookieCredentials, // user data goes into res.locals.userData
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  cwController.rankFuncsByMetric, // function details go into res.locals.lambdaFunctions
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.functionRankings);
  }
);

router.post(
  '/costOfFunction/:funcName/:period',
  costController.calcLambdaFuncCost,
  (req: Request, res: Response) => {
    res.status(200).json();
  }
);

router.post(
  '/costEachFunction/:period',
  costController.calcLambdaCostEach,
  (req: Request, res: Response) => {
    res.status(200).json();
  }
);

router.post(
  '/costAllFunctions/:period',
  cookieController.getCookieCredentials, // user data goes into res.locals.userData
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions,
  costController.calcLambdaCostAll,
  (req: Request, res: Response) => {
    res.status(200).json();
  }
);

router.post(
  '/lambdaLogs/:function/:period',
  credController.getCreds, // credentials go into res.locals.credentials
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaErrorLogsByFunc/:function/:period',
  credController.getCreds,
  logController.getLambdaErrorsByFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaErrorLogsEachFunc/:period',
  credController.getCreds,
  lambdaController.getFunctions,
  logController.getLambdaErrorsEachFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

router.post(
  '/lambdaLogMetricsByFunc/:function/:period',
  credController.getCreds,
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/lambdaLogMetricsByFunc/:function/:period',
  credController.getCreds,
  logController.getLambdaLogs,
  analysisController.calcMetrics,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/stateMetricsByFunc/:metric/:period/:stat',
  credController.getCreds, // credentials go into res.locals.credentials,
  stepController.getStateMetricByFunc,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

export default router;
