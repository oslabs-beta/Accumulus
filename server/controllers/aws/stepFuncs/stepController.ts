import 'dotenv/config';
import express from 'express';
import formatCW from './formatCW';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

const stepController: any = {};

stepController.getStateMetricByFunc = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region, stateArn } = req.body;
  const graphMetricName = req.params.metric;
  const graphMetricStat = req.params.stat;
  const periodSelection = req.params.period;
  let graphPeriod;
  let graphUnits;

  if (periodSelection === '30min') {
    [graphPeriod, graphUnits] = [30, 'minutes'];
  } else if (periodSelection === '1hr') {
    [graphPeriod, graphUnits] = [60, 'minutes'];
  } else if (periodSelection === '24hr') {
    [graphPeriod, graphUnits] = [24, 'hours'];
  } else if (periodSelection === '7d') {
    [graphPeriod, graphUnits] = [7, 'days'];
  } else if (periodSelection === '14d') {
    [graphPeriod, graphUnits] = [14, 'days'];
  } else if (periodSelection === '30d') {
    [graphPeriod, graphUnits] = [30, 'days'];
  } else if (periodSelection === '3mon') {
    [graphPeriod, graphUnits] = [90, 'days'];
  } else if (periodSelection === '6mon') {
    [graphPeriod, graphUnits] = [180, 'days'];
  } else if (periodSelection === '1y') {
    [graphPeriod, graphUnits] = [30, 'days'];
  }

  const cwClient = new CloudWatchClient({
    region,
    credentials,
  });

  const metricAllFuncInputParams = formatCW.formatCWStateMetricByFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat,
    stateArn
  );

  // Send API request
  try {
    const query = new GetMetricDataCommand(metricAllFuncInputParams);
    const metricAllFuncResult = await cwClient.send(query);
    console.log(
      'cwController.getStateMetricByFunc METRIC ALL FUNC DATA: ',
      metricAllFuncResult
    );

    let metricAllFuncData =
      metricAllFuncResult.MetricDataResults![0].Timestamps!.map(
        (timeStamp, index) => {
          return {
            x: timeStamp,
            y: metricAllFuncResult.MetricDataResults![0].Values![index],
          };
        }
      );

    const metricMaxValue = Math.max(
      ...metricAllFuncResult.MetricDataResults![0].Values!,
      0
    );

    const metricAllFuncOutput = {
      title: metricAllFuncResult.MetricDataResults![0].Label,
      options: {
        startTime: metricAllFuncInputParams.StartTime,
        endTime: metricAllFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        metricMaxValue,
      },
    };

    res.locals.lambdaMetricsAllFuncs = metricAllFuncOutput;
    console.log(
      'cwController.getStateMetricByFunc FORMATTED METRIC ALL FUNC DATA',
      metricAllFuncOutput
    );

    next();
  } catch (err) {
    console.log(
      'cwController.getStateMetricByFunc failed to GetMetricDataCommand'
    );
    return next(err);
  }
};

export default stepController;
