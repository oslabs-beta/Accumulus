import 'dotenv/config';
import moment from 'moment';

const formatController: any = {};

formatController.timeRangePeriod = {
  // dimension is seconds (i.e. 60 is 60s)
  minutes: 60, // 1 minute granularity
  hours: 60 * 60, // 1 hour granularity
  days: 60 * 60 * 24, // 1 day granularity --> returns 30 data points for @period='30d'
};

formatController.timeRoundMultiplier = {
  minutes: 5, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 15, //rounded to nearest 15 minutes
  days: 60, // rounded to nearest hour
};

formatController.timeRangeMultiplier = {
  minutes: 60, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 3600, //rounded to nearest 15 minutes
  days: 86400, // rounded to nearest hour
};

formatController.formatQueryTimes = (
  timeRangeUnits: number,
  timeRangeNum: string
) => {
  // Format start and end time for sdk query func
  const timeRound =
    formatController.timeRoundMultiplier[timeRangeUnits.toString()];
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / +timeRound) * 60 * +timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime -
    +timeRangeNum *
      +formatController.timeRangeMultiplier[timeRangeUnits.toString()];
  const period = formatController.timeRangePeriod[timeRangeUnits.toString()];

  return [StartTime, EndTime, period];
};

formatController.periodDefinitions = {
  '1hr': [60, 'minutes'],
  '12hr': [12, 'hours'],
  '24hr': [24, 'hours'],
  '7d': [7, 'days'],
  '14d': [14, 'days'],
  '30d': [30, 'days'],
  '3mo': [90, 'days'],
  '6mo': [180, 'days'],
  '1yr': [30, 'days'],
};

formatController.formatXAxisLabel = (timeStamp: Date, graphUnits: string) => {
  if (graphUnits === 'days') {
    return moment(timeStamp).format('MMM DD');
  } else if (graphUnits === 'hours') {
    return moment(timeStamp).format('HH:00');
  } else if (graphUnits === 'minutes') {
    return moment(timeStamp).format('HH:mm');
  }
  return;
};

formatController.aggregateFuncByPeriodConversion = (
  period: string,
  curDate: Date,
  endDate: Date
) => {
  interface IPeriodConvert {
    '30min'?: number[];
    '1hr'?: number[];
    '24hr'?: number[];
    '7d'?: number[];
    '14d'?: number[];
    '30d'?: number[];
    '3mo'?: number[];
    '6mo'?: number[];
    '1yr'?: number[];
  }
  const periodConvert: IPeriodConvert = {
    '30d': [
      curDate.getDate(),
      endDate.getDate(),
      curDate.getMonth(),
      endDate.getMonth(),
    ],
  };

  return periodConvert[period as '30d'];
};

formatController.formatCWLambdaMetricAll = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string
) => {
  // Formatting & defining the start-end times that the AWS-query pulls metric data from
  const [StartTime, EndTime, period] = formatController.formatQueryTimes(
    timeRangeUnits,
    timeRangeNum
  );

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
        ReturnData: false,
        MetricStat: {
          Metric: {
            Namespace: 'AWS/Lambda',
            MetricName: `${metricName}`,
          },
          Period: period,
          Stat: metricStat,
        },
      },
      {
        Id: `m${metricName}`,
        Label: `Lambda ${metricName} All Functions`,
        Expression: `FILL(METRICS(), 0)`,
      },
    ],
  };
};

formatController.formatCWLambdaMetricByFunc = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string,
  funcNames: []
) => {
  const [StartTime, EndTime, period] = formatController.formatQueryTimes(
    timeRangeUnits,
    timeRangeNum
  );

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
    const metricDataQuery = {
      Id: `m${index}`,
      // Label: `Lambda ${metricName} ${func}`,
      Label: `${func}`,
      Function: func,
      ReturnData: false,
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
    const queryWithMissingFilled = {
      Id: `m${index}fill`,
      Label: func,
      Expression: `FILL(m${index}, 0)`,
    };
    metricDataQueryByFunc.push(queryWithMissingFilled);
    metricDataQueryByFunc.push(metricDataQuery);
  });
  const metricParamsByFunc = {
    ...lambdaMetricQueryParamsBase,
    MetricDataQueries: metricDataQueryByFunc,
  };

  return metricParamsByFunc;
};

formatController.monthConversion = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

formatController.logPeriodConversion = {
  '30min': new Date(new Date().setMinutes(new Date().getMinutes() - 30)).valueOf(),
  '1hr': new Date(new Date().setMinutes(new Date().getMinutes() - 60)).valueOf(),
  '12hr': new Date(new Date().setMinutes(new Date().getMinutes() - 720)).valueOf(),
  '24hr': new Date(new Date().setDate(new Date().getDate() - 1)).valueOf(),
  '7d': new Date(new Date().setDate(new Date().getDate() - 7)).valueOf(),
  '14d': new Date(new Date().setDate(new Date().getDate() - 14)).valueOf(),
  '30d': new Date(new Date().setDate(new Date().getDate() - 30)).valueOf(),
};

export default formatController;
