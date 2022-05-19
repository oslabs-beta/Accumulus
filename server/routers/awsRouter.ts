import express, { Response, Request, NextFunction } from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
import costController from '../controllers/aws/costController';
import logController from '../controllers/aws/logController';
import stepController from '../controllers/aws/stepFuncs/stepController';
import cookieController from '../controllers/cookieController';
import analysisController from '../controllers/aws/analysisController';
import * as cacheController from '../controllers/aws/cacheController';
// import * as types from '../types';

const router = express.Router();

/* Lambda Function Names and Config Settings */
router.get(
  '/',
  (req: express.Request, res: express.Response) => {
    console.log('SHOULD SHOW COOKIES HERE:')
    res.status(200).json({})
  }
);

router.post(
  '/lambdaNames',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  cacheController.cacheSet,
  (req: express.Request, res: express.Response) => {
    // console.log('SHOULD SHOW COOKIES HERE:', req.cookies)
    res.status(200).json(res.locals.funcNames);
  }
);

/* Cloudwatch Metrics */
router.post(
  '/metricsTotalFuncs/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  cwController.getMetricsTotalLambda,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/metricsEachFunc/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,  
  credController.getCreds,
  lambdaController.getFunctions,
  cwController.getMetricsEachLambda,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals[req.params.metric]);
  }
);

router.post(
  '/rankFuncsByMetric/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  cacheController.cacheGet, 
  credController.getCreds,
  lambdaController.getFunctions,
  cwController.rankFuncsByMetric,
  cacheController.cacheSet, 
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.functionRankings);
  }
);

/* Lambda Costs */
router.post(
  '/costEachFunction/:period',
  cookieController.getCookieCredentials, // user data goes into res.locals.userData
  cacheController.cacheGet, 
  credController.getCreds,
  lambdaController.getFunctions, // res.locals.funcNames & res.locals.lambdaFunctions
  (req: Request, res: Response, next: NextFunction) => {
    req.params.metric = 'Invocations';
    req.params.stat = 'Sum';
    next();
  },
  cwController.getMetricsEachLambda,
  (req: Request, res: Response, next: NextFunction) => {
    req.params.metric = 'Duration';
    req.params.stat = 'Sum';
    next();
  },
  cwController.getMetricsEachLambda,
  costController.calcCostEachLambda,
  cacheController.cacheSet, 
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.costData);
  }
);

/* All logs */
/* For Debugging One Function */
// router.post(
//   '/lambdaLogs/:function/:period',
//   cookieController.getCookieCredentials,
//   cacheController.cacheGet, 
//   credController.getCreds,
//   logController.getLambdaLogsByFunc,
//   analysisController.calcMetrics 
//   cacheController.cacheSet, 
//   (req: Request, res: Response) => {
//     res.status(200).json(res.locals.data);
//   }
// );

router.post(
  '/lambdaErrorLogsEachFunc/:period',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  lambdaController.getFunctions,
  logController.getLambdaErrorsEachFunc,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.logs);
  }
);

// /* Log Metrics for debugging */
// router.post(
//   '/lambdaLogMetricsByFunc/:function/:period',
//   cookieController.getCookieCredentials,
//   cacheController.cacheGet,
//   credController.getCreds,
//   logController.getLambdaLogsByFunc,
//   analysisController.calcMetrics,
//   cacheController.cacheSet,
//   (req: Request, res: Response) => {
//     res.status(200).json(res.locals.data);
//   }
// );

router.post(
  '/lambdaLogMetricsEachFunc/:period',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  logController.getLambdaLogsByFunc,
  analysisController.calcMetrics,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

router.post(
  '/lambdaLogMetricsTotalFunc/:function/:period',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  logController.getLambdaLogsByFunc,
  analysisController.calcMetrics,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

/* Log Memory Usage */
router.post(
  '/memoryUsageEachLambda/:period',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  lambdaController.getFunctions,
  logController.getLambdaUsageEachFunc,
  analysisController.calcMemoryUsage,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

/* Takes a long time to fetch on first try! */
// router.post(
//   '/memoryUsageTotalLambda/:period',
//   cookieController.getCookieCredentials,
//   cacheController.cacheGet,
//   credController.getCreds,
//   lambdaController.getFunctions,
//   logController.getLambdaUsageEachFunc,
//   analysisController.calcMeanMemoryUsageTotal,
//   cacheController.cacheSet,
//   (req: Request, res: Response) => {
//     res.status(200).json(res.locals.data);
//   }
// );

router.post(
  '/memoryUsageDiff/:period',
  cookieController.getCookieCredentials,
  cacheController.cacheGet,
  credController.getCreds,
  lambdaController.getFunctions,
  logController.getLambdaUsageEachFunc,
  analysisController.calcLambdaMemoryDiff,
  cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.data);
  }
);

/* Step Function Metrics */
router.post(
  '/stateMetricsByFunc/:metric/:period/:stat',
  cookieController.getCookieCredentials,
  credController.getCreds,
  // cacheController.cacheGet,
  stepController.getStateMetricByFunc,
  // cacheController.cacheSet,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

export default router;
