import 'dotenv/config';
import express from 'express';
import utilController from './utilController';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';

const cwController: any = {};

// type RangeFormat = {
//   minutes: number;
//   hours: number;
//   days: number;
// }
// let timeRangePeriod: Record<string, RangeFormat> = {};
// let timeRoundMultiplier: Record<string, RangeFormat> = {};
// let timeRangeMultiplier: Record<string, RangeFormat> = {};
/* Handle metric range for API req and frontend visuals */
// TODO:
// Refactor or abstract out

// interface ITime{
//   minutes: number;
//   hours: number;
//   days: number;
// }

const timeRangePeriod: { [key: string]: string | number } = {
  minutes: 60, //60 seconds
  hours: 300, //300 secs
  days: 3600, // 1 hour
};

const timeRoundMultiplier: { [key: string]: string | number } = {
  minutes: 5, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 15, //rounded to nearest 15 minutes
  days: 60, // rounded to nearest hour
};

const timeRangeMultiplier: { [key: string]: string | number } = {
  minutes: 60, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 3600, //rounded to nearest 15 minutes
  days: 86400, // rounded to nearest hour
};

cwController.formatCWLambdaMetricAll = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string
) => {
  // Format start and end time for sdk query func
  const timeRound = timeRoundMultiplier[timeRangeUnits.toString()];
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * +timeRangeMultiplier[timeRangeUnits.toString()];
  const period = timeRangePeriod[timeRangeUnits.toString()];

  // Format Query
  return {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    MetricDataQueries: [
      {
        Id: `m${metricName}_AllLambdaFunc`,
        Label: `Lambda ${metricName} All Functions`,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: `${metricName}`,
          },
          Period: period,
          Stat: metricStat,
        },
      },
    ],
  };
};

cwController.formatCWLambdaMetricByFunc = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string,
  funcNames: []
) => {
  const timeRound = timeRoundMultiplier[timeRangeUnits.toString()];
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * +timeRangeMultiplier[timeRangeUnits.toString()];
  const period = timeRangePeriod[timeRangeUnits.toString()];

  // Init the baseline object params
  const lambdaMetricQueryParamsBase = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryByFunc: object[] = [];

  // Iterate over lambda funcs and format
  funcNames.forEach((func, index) => {
    let metricDataQuery = {
      Id: `m${index}`,
      Label: `Lambda ${metricName} ${func}`,
      MetricStat: {
        Metric: {
          Namespace: 'AWS/Lambda',
          MetricName: `${metricName}`,
          Dimensions: [
            {
              Name: 'FunctionName',
              Value: `${func}`,
            },
          ],
        },
        Period: period,
        Stat: metricStat,
      },
    };
    metricDataQueryByFunc.push(metricDataQuery);
  });

  const metricParamsByFunc = {
    ...lambdaMetricQueryParamsBase,
    MetricDataQueries: metricDataQueryByFunc,
  };

  return metricParamsByFunc;
};

const lambdaMetrics = {
  invocations: 'Invocations',
  duration: 'Duration',
  errors: 'Errors',
  throttles: 'Throttles',
};

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
  let graphPeriod;
  let graphUnits;

  // Convert time to format for AWS SDK query
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

  // Metrics for all lambda functions
  const metricAllFuncInputParams = cwController.formatCWLambdaMetricAll(
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
    console.log(
      'cwController.getLambdaMetricsAll METRIC ALL FUNC DATA: ',
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
      data: metricAllFuncData.reverse(),
      options: {
        startTime: metricAllFuncInputParams.startTime,
        endTime: metricAllFuncInputParams.endTime,
        graphPeriod,
        graphUnits,
        metricMaxValue,
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
  let graphPeriod;
  let graphUnits;
  let funcNames = res.locals.funcNames;

  // Convert time to format for AWS SDK query
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


  //Metrics for By Lambda Function
  const metricByFuncInputParams = cwController.formatCWLambdaMetricByFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat,
    funcNames
  );

  console.log(metricByFuncInputParams)

  try {
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );
    console.log('RESULT: ', metricByFuncResult)

    const metricByFuncData = metricByFuncResult!.MetricDataResults!.map(
      (metricDataResult) => {
        let metricName = metricDataResult.Label;
        let timeStamps = metricDataResult!.Timestamps!.reverse();
        let values = metricDataResult!.Values!.reverse();
        let metricData = timeStamps.map((timeStamp, index) => {
          return {
            x: timeStamp,
            y: values[index],
          };
        });

        let maxValue = Math.max(0, Math.max(...values));
        let total = values.reduce((accum, curr) => accum + curr, 0);

        return {
          name: metricName,
          data: metricData,
          maxValue: maxValue,
          total: total,
        };
      }
    );
      console.log('METRIC FUNC DATA: ', metricByFuncData[0].data)
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
    console.log('FINAL DATA: ', res.locals.metricByFuncData.series[0].data)

    return next();
  } catch (err) {
    console.error('Error in CW getMetricsData By Functions', err);
  }
};

export default cwController;
