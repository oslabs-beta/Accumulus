import 'dotenv/config';
import express from 'express';
import formatController from './formatController';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

const cwController: any = {};

cwController.getLambdaMetricsAll = async (
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

  // console.log('metricAllFuncInputParams', metricAllFuncInputParams);

  // Send API req
  try {
    const metricAllFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricAllFuncInputParams)
    );
    // console.log(
    //   'cwController.getLambdaMetricsAll METRIC ALL FUNC DATA: ',
    //   metricAllFuncResult
    // );

    let metricAllFuncData =
      metricAllFuncResult.MetricDataResults![0].Timestamps!.map(
        (timeStamp, index) => {
          return {
            month: formatController.monthConversion[timeStamp.getMonth()],
            day: timeStamp.getDay(),
            hour: timeStamp.getHours(),
            minute: timeStamp.getMinutes(),
            value: metricAllFuncResult.MetricDataResults![0].Values![index],
            // x: timeStamp,
            // y: metricAllFuncResult.MetricDataResults![0].Values![index],
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

    res.locals.lambdaMetricsAllFuncs = metricAllFuncOutput;
    console.log(
      'cwController.getLambdaMetricsAll FORMATTED METRIC ALL FUNC DATA',
      metricAllFuncOutput
    );
    next();
  } catch (err) {
    console.log(
      'cwController.getLambdaMetricsAll failed to GetMetricDataCommand'
    );
    return next(err);
  }
};

cwController.getMetricsByFunc = async (
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

  console.log(metricByFuncInputParams);

  try {
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );
    console.log('RESULT: ', metricByFuncResult);

    const metricByFuncData = metricByFuncResult!.MetricDataResults!.map(
      (metricDataResult) => {
        const metricName = metricDataResult.Label;
        const timeStamps = metricDataResult!.Timestamps!.reverse();
        const values = metricDataResult!.Values!.reverse();
        const metricData = timeStamps.map((timeStamp, index) => {
          return {
            month: formatController.monthConversion[timeStamp.getMonth()],
            day: timeStamp.getDay(),
            hour: timeStamp.getHours(),
            minute: timeStamp.getMinutes(),
            [`${metricName}`]: values[index],
          };
        });

        const maxValue = Math.max(0, Math.max(...values));
        const total = values.reduce((accum, curr) => accum + curr, 0);

        return {
          name: metricName,
          data: metricData,
          maxValue: maxValue,
          total: total,
        };
      }
    );
    console.log('METRIC FUNC DATA: ', metricByFuncData[0].data);
    const metricMaxValueAllFunc = metricByFuncData.reduce(
      (maxValue, dataByFunc) => {
        return Math.max(maxValue, dataByFunc.maxValue);
      },
      0
    );

    //Request response JSON Object send to the FrontEnd

    res.locals.metricByFuncData = {
      title: `Lambda ${graphMetricName}`,
      series: metricByFuncData,
      options: {
        startTime: metricByFuncInputParams.StartTime,
        endTime: metricByFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        metricMaxValueAllFunc,
        funcNames: funcNames,
      },
    };
    console.log('FINAL DATA: ', res.locals.metricByFuncData);

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
    metricByFuncData.sort((a, b) => a.value - b.value);

    // Request response JSON Object send to the FrontEnd
    res.locals.functionRankings = {
      title: `Lambda-${graphMetricName}`,
      ranking: metricByFuncData,
      // functions: funcNames // ** Use if we need easy access to func names for graph axis
    };
    // console.log('FINAL DATA: ', res.locals.functionRankings)

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
