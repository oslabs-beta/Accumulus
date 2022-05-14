import 'dotenv/config';
import express from 'express';
import formatController from './formatController';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { tidy, groupBy, summarize, sum } from '@tidyjs/tidy';

const cwController: any = {};

cwController.getMetricsTotalLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Get AWS creds for client and destructure params
  const { credentials } = res.locals;
  const { region } = req.body;
  const graphMetricName = req.params.metric;
  const graphMetricStat = req.params.stat;
  const periodSelection = req.params.period;
  const [graphPeriod, graphUnits] =
    formatController.periodDefinitions[periodSelection];

  const cwClient = new CloudWatchClient({
    region,
    credentials,
  });

  // Metrics for all lambda functions
  const metricAllFuncInputParams = formatController.formatCWLambdaMetricAll(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat
  );

  // Send API req
  try {
    const metricAllFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricAllFuncInputParams)
    );

    let metricAllFuncData =
      metricAllFuncResult.MetricDataResults![0].Timestamps!.map(
        (timeStamp, index) => {
          return {
            xkey: formatController.formatXAxisLabel(timeStamp, graphUnits),
            value: metricAllFuncResult.MetricDataResults![0].Values![index],
          };
        }
      );

    const metricAllFuncOutput = {
      title: metricAllFuncResult.MetricDataResults![0].Label,
      data: metricAllFuncData.reverse(),
      options: {
        startTime: metricAllFuncInputParams.startTime,
        endTime: metricAllFuncInputParams.endTime,
        graphPeriod,
        graphUnits,
      },
    };

    res.locals.data = metricAllFuncOutput;
    return next();
  } catch (err) {
    console.log(
      'cwController.getLambdaMetricsAll failed to GetMetricDataCommand'
    );
    return next(err);
  }
};

cwController.getMetricsEachLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const graphMetricName = req.params.metric;
  const graphMetricStat = req.params.stat;
  const periodSelection = req.params.period;
  const [graphPeriod, graphUnits] =
    formatController.periodDefinitions[periodSelection];
  let funcNames = res.locals.funcNames;

  const cwClient = new CloudWatchClient({
    region,
    credentials,
  });

  //Metrics for By Lambda Function
  const metricByFuncInputParams = formatController.formatCWLambdaMetricByFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat,
    funcNames
  );

  try {
    // Make cloudwatch API request -- contains several isolated requests
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );

    // Format response data from querying cloudwatch metric SDK
    const metricByFuncData = metricByFuncResult!.MetricDataResults!.map(
      (metricDataResult, index) => {
        const metricName = metricDataResult.Label;
        const timeStamps = metricDataResult!.Timestamps!.reverse();
        const values = metricDataResult!.Values!.reverse();
        const metricData = timeStamps.map((timeStamp, index) => {
          return {
            id: index,
            // month: formatController.monthConversion[timeStamp.getMonth()],
            // day: timeStamp.getDate(),
            // hour: timeStamp.getHours(),
            // minute: timeStamp.getMinutes(),
            xkey: formatController.formatXAxisLabel(timeStamp, graphUnits),
            [`${metricName}`]: values[index],
          };
        });
        const total = values.reduce((accum, curr) => accum + curr, 0);

        return {
          name: metricName,
          data: metricData,
          total: total,
        };
      }
    );

    // Format all data being returned from each iteration of cloudwatch API requests
    const tmpData = {
      title: `Lambda ${graphMetricName}`,
      series: metricByFuncData,
      options: {
        startTime: metricByFuncInputParams.StartTime,
        endTime: metricByFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        funcNames: funcNames,
      },
    };

    // Iterate over each series starting at index=1
    for (let i = 1; i < tmpData.series.length; i++) {
      // Iterate over each data point in series
      for (let j = 0; j < tmpData.series[0].data.length; j++) {
        // Pushing value for given data point (data[j]) for given function (funcNames[i])
        // into existing data point on series[0], the first function listed
        tmpData.series[0].data[j][funcNames[i]] = tmpData.series[i].data[j][funcNames[i]];
      }
    }
    res.locals[graphMetricName] = tmpData;
    return next();
  } catch (err) {
    console.error('Error in CW getMetricsData By Functions', err);
  }
};

cwController.rankFuncsByMetric = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const graphMetricName = req.params.metric;
  const graphMetricStat = req.params.stat;
  const periodSelection = req.params.period;
  const [graphPeriod, graphUnits] =
    formatController.periodDefinitions[periodSelection];
  let funcNames = res.locals.funcNames;

  const cwClient = new CloudWatchClient({
    region,
    credentials,
  });

  //Metrics for By Lambda Function
  const metricByFuncInputParams = formatController.formatCWLambdaMetricByFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat,
    funcNames
  );

  try {
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );

    const metricByFuncData = metricByFuncResult!.MetricDataResults!.map(
      (metricDataResult) => {
        const functionName = metricDataResult.Label;
        const values = metricDataResult!.Values!.reverse();
        const value = values.reduce((accum, curr) => accum + curr, 0);

        return {
          name: functionName,
          value: value,
        };
      }
    );

    // Sort based on metric value for each function
    metricByFuncData.sort((a, b) => b.value - a.value);

    // Request response JSON Object send to the FrontEnd
    res.locals.functionRankings = {
      title: `Lambda-${graphMetricName}`,
      ranking: metricByFuncData.slice(1, 6),
      // functions: funcNames // ** Use if we need easy access to func names for graph axis
    };

    return next();
  } catch (err) {
    console.error('Error in CW getMetricsData By Functions', err);
  }
};

cwController.getLambdaLogs = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {};

export default cwController;
