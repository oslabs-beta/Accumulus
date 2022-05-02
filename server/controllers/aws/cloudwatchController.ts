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

// const metricAllFuncInputParams = cwController.formatCWLambdaMetricAll(
//   graphPeriod,
//   graphUnits,
//   graphMetricName,
//   graphMetricStat
// );

cwController.formatCWLambdaMetricAll = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string
) => {
  console.log(timeRangeNum, timeRangeUnits, metricName, metricStat);
  // Format start and end time for sdk query func
  const timeRound = timeRoundMultiplier[timeRangeUnits.toString()]; // 60
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound; //current time in Unix TimeStamp
  console.log('EndTime', EndTime);
  const StartTime =
    EndTime - timeRangeNum * +timeRangeMultiplier[timeRangeUnits.toString()]; // 7 * 86400
  console.log('StartTime', StartTime);
  const period = timeRangePeriod[timeRangeUnits.toString()]; // period = 3600

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

// Id: 'mInvocations_AllLambdaFunc',
// Label: 'Lambda Invocations All Functions',
// Timestamps: [Array],
// Values: [Array],
// StatusCode: 'Complete',
// Messages: undefined

cwController.formatCWLambdaMetricByFunc = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string,
  funcNames: []
) => {
  const timeRound = timeRoundMultiplier[timeRangeUnits];
  //define the End and Start times in UNIX time Stamp format for getMetricsData method
  //Rounded off to nearest timeRoundMultiplier
  const endTime =
    Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound; //current time in Unix TimeStamp
  const startTime =
    endTime - timeRangeNum * +timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  // Init the baseline object params
  const lambdaMetricQueryParamsBase = {
    startTime: new Date(startTime * 1000),
    endTime: new Date(endTime * 1000),
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
  // Get AWS creds for client
  // const account = utilController.getAwsCreds();
  const { credentials } = res.locals;
  const { region } = req.body;
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

  // Init input vars for graph

  // TODO:
  // PULL THIS FROM FRONTEND ONCE IMPLEMENTED -- CURRENTLY HARDCODED

  //function to switch graphMetricStat based on query params

  // else graphMetricStat = req.body.metricStat;

  // Metrics for all lambda functions
  const metricAllFuncInputParams = cwController.formatCWLambdaMetricAll(
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

export default cwController;
