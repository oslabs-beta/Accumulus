import express from 'express';
import lambdaController from '../controllers/aws/lambdaController';
import credController from '../controllers/aws/credController';
import cwController from '../controllers/aws/cloudwatchController';
// import * as types from '../types';

const router = express.Router();

router.post('/getCreds', credController.getCreds, (req, res) => {
  res.status(200).json(res.locals.credentials);
});

router.post('/lambda', lambdaController.getFunctions, (req, res) => {
  res.status(200).json(res.locals.lambdaFunctions);
});

router.get('/metrics', cwController.getLambdaMetricsAll, (req, res) => {
    res.status(200).json(res.locals.lambdaMetricsAllFuncs);
  }
);

//Make a post request to metrics with "TypeOfMetric" in the body
// router.post('/metrics', cwController.getLambdaMetricsAll, (req, res) => {
//   res.status(200).json(res.locals.lambdaMetricsAllFuncs);
// }
// );

export default router;
