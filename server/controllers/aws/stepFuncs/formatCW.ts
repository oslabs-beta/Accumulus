import 'dotenv/config';

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

const formatCW: any = {};

formatCW.formatCWStateMetricByFunc = (
  timeRangeNum: number,
  timeRangeUnits: string,
  metricName: string,
  metricStat: string,
  stateArn: string
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
    StartTime: new Date(startTime * 1000),
    EndTime: new Date(endTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryByFunc: object[] = [];
  // Iterate over lambda funcs and format
  // stateArn.forEach((func, index) => {
  let metricDataQuery = {
    // Id: `m${index}`,
    Id: `m1`,
    Label: `Lambda ${metricName} ${stateArn}`,
    MetricStat: {
      Metric: {
        Namespace: 'AWS/State',
        MetricName: `${metricName}`,
        Dimensions: [
          {
            Name: 'StateMachineArn',
            Value: `${stateArn}`,
          },
        ],
      },
      Period: period,
      Stat: metricStat,
    },
  };
  metricDataQueryByFunc.push(metricDataQuery);
  // });

  const metricParamsByFunc = {
    ...lambdaMetricQueryParamsBase,
    MetricDataQueries: metricDataQueryByFunc,
  };

  return metricParamsByFunc;
};

export default formatCW;
