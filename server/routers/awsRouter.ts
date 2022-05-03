import express from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
import costController from '../controllers/aws/costController';
import logController from '../controllers/aws/logController';
import stepController from '../controllers/aws/stepFuncs/stepController';
// import * as types from '../types';

const router = express.Router();

// TODO: Need /lambdaSingleFunc and /lambdaAllFunc for cost routes

router.post(
  '/lambda',
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  (req, res) => {
    res.status(200).json(res.locals.lambdaFunctions);
  }
);

router.post(
  '/metricsAllFuncs/:metric/:period/:stat',
  credController.getCreds, // credentials go into res.locals.credentials,
  cwController.getLambdaMetricsAll,
  (req, res) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

router.post(
  '/metricsByFunc/:metric/:period/:stat',
  credController.getCreds, // credentials go into res.locals.credentials,
  lambdaController.getFunctions,
  cwController.getMetricsByFunc,
  (req, res) => {
    res.status(200).json(res.locals.metricByFuncData);
  }
);

router.post(
  '/rankFuncsByMetric/:metric/:period',
  credController.getCreds, // credentials go into res.locals.credentials
  lambdaController.getFunctions, // function details go into res.locals.lambdaFunctions
  cwController.rankFuncsByMetric, // function details go into res.locals.lambdaFunctions
  (req, res) => {
    res.status(200).json(res.locals.functionRankings);
  }
);

router.post(
  '/costOfFunction/:funcName/:period',
  costController.calcLambdaFuncCost,
  (req, res) => {
    res.status(200).json();
  }
)

router.post(
  '/costEachFunction/:period',
  costController.calcLambdaCostEach,
  (req, res) => {
    res.status(200).json();
  }
)

router.post(
  '/costAllFunctions/:period',
  lambdaController.getFunctions,
  costController.calcLambdaCostAll,
  (req, res) => {
    res.status(200).json();
  }
)

router.post(
  '/getLambdaLogs/:function/:period',
  credController.getCreds, // credentials go into res.locals.credentials
  // lambdaController.getFunctions,
  logController.getLambdaLogs,
  (req, res) => {
    res.status(200).json(res.locals.logs);
  }
)

router.post(
  '/stateMetricsByFunc/:metric/:period/:stat',
  credController.getCreds, // credentials go into res.locals.credentials,
  stepController.getStateMetricByFunc,
  (req, res) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

//Make a post request to metrics with "TypeOfMetric" in the body
// router.post('/metrics', cwController.getLambdaMetricsAll, (req, res) => {
//   res.status(200).json(res.locals.lambdaMetricsAllFuncs);
// }
// );

export default router;
