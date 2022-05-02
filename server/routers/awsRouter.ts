import express from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
// import * as types from '../types';

const router = express.Router();

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

//Make a post request to metrics with "TypeOfMetric" in the body
// router.post('/metrics', cwController.getLambdaMetricsAll, (req, res) => {
//   res.status(200).json(res.locals.lambdaMetricsAllFuncs);
// }
// );

export default router;
