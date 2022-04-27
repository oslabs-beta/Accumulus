// @ts-nocheck
require('dotenv').config()
const cloudwatchController = {}

const {
  CloudWatchClient,
  GetMetricDataCommand,
} = require('@aws-sdk/client-cloudwatch');

/*
  User input for time range
*/
const timeRangePeriod = {
  minutes: 60, //60 seconds
  hours: 300, //300 secs
  days: 3600, // 1 hour
};

//rouding parameters for defining the EndTime

const timeRoundMultiplier = {
  minutes: 5, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 15, //rounded to nearest 15 minutes
  days: 60, // rounded to nearest hour
};

const timeRangeMultiplier = {
  minutes: 60, //the EndTime time stamps will be rounded to nearest 5 minutes
  hours: 3600, //rounded to nearest 15 minutes
  days: 86400, // rounded to nearest hour
};

const AWSUtilFunc = {};

AWSUtilFunc.prepCwMetricQueryLambdaAllFunc = (
  /** @type {number} */ timeRangeNum,
  /** @type {string | number} */ timeRangeUnits,
  /** @type {any} */ metricName,
  /** @type {any} */ metricStat
) => {
  const timeRound = timeRoundMultiplier[timeRangeUnits];
  //define the End and Start times in UNIX time Stamp format for getMetricsData method
  //Rounded off to nearest timeRoundMultiplier
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / timeRound) * 60 * timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  //initialize the parameters
  const metricParamsBaseAllFunc = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryAllfunc = [
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
  ];

  const metricParamsAllfunc = {
    ...metricParamsBaseAllFunc,
    MetricDataQueries: metricDataQueryAllfunc,
  };

  return metricParamsAllfunc;
};

AWSUtilFunc.prepCwMetricQueryLambdaByFunc = (
  /** @type {number} */ timeRangeNum,
  /** @type {string | number} */ timeRangeUnits,
  /** @type {any} */ metricName,
  /** @type {any} */ metricStat,
  /** @type {any[]} */ funcNames
) => {
  const timeRound = timeRoundMultiplier[timeRangeUnits];
  //define the End and Start times in UNIX time Stamp format for getMetricsData method
  //Rounded off to nearest timeRoundMultiplier
  const EndTime =
    Math.round(new Date().getTime() / 1000 / 60 / timeRound) * 60 * timeRound; //current time in Unix TimeStamp
  const StartTime =
    EndTime - timeRangeNum * timeRangeMultiplier[timeRangeUnits];

  const period = timeRangePeriod[timeRangeUnits];

  //initialize the parameters
  const metricParamsBaseByFunc = {
    StartTime: new Date(StartTime * 1000),
    EndTime: new Date(EndTime * 1000),
    LabelOptions: {
      Timezone: '-0400',
    },
    //    MetricDataQueries: [],
  };

  const metricDataQueryByFunc = [];

  funcNames.forEach((func, index) => {
    let metricDataQuery = {
      Id: `m${index}`,
      Label: `Lambda ${metricName} ${func}`,
      MetricStat: {
        Metric: {
          Namespace: `AWS/Lambda`,
          MetricName: `${metricName}`,
          Dimensions: [
            {
              Name: `FunctionName`,
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
    ...metricParamsBaseByFunc,
    MetricDataQueries: metricDataQueryByFunc,
  };
  return metricParamsByFunc;
};

//Extract the CloudWatch Metrics for the Lambda Functions
//***********************Begin************************ */
const getAwsAccount = (req, res, next) => {
  const account = {
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
  	}
  }
  
  return account;
}



const lambdaMetrics = {
  invocations: 'Invocations',
  duration: 'Duration',
  errors: 'Errors',
  throttles: 'Throttles'
}

const getMetricsAllFunc = async (req, res, next) => {
  console.log('Triggered getMetricsAllFunc')
  const account = getAwsAccount();
  const cwClient = new CloudWatchClient({
    region: account.region,
    credentials: account.credentials
  });
  console.log(account)
  console.log(cwClient)
  //initialize the variables for creating the inputs for AWS request
  let graphPeriod, graphUnits, graphMetricName, graphMetricStat;

  graphMetricName = 'Throttles';

  // if (req.body.timePeriod === '30min') {
  //   [graphPeriod, graphUnits] = [30, 'minutes'];
  // } else if (req.body.timePeriod === '1hr') {
  //   [graphPeriod, graphUnits] = [60, 'minutes'];
  // } else if (req.body.timePeriod === '24hr') {
  // } else if (req.body.timePeriod === '7d') {
  //   [graphPeriod, graphUnits] = [7, 'days'];
  // } else if (req.body.timePeriod === '14d') {
  //   [graphPeriod, graphUnits] = [14, 'days'];
  // } else if (req.body.timePeriod === '30d') {
  //   [graphPeriod, graphUnits] = [30, 'days'];
  // }



  [graphPeriod, graphUnits] = [7, 'days'];
  graphMetricStat = 'Sum';
  // else graphMetricStat = req.body.metricStat;

  //Metrics for All Functions (combined)
  //Prepare the input parameters for the AWS getMetricsData API Query
  const metricAllFuncInputParams = AWSUtilFunc.prepCwMetricQueryLambdaAllFunc(
    graphPeriod,
    graphUnits,
    graphMetricName,
    graphMetricStat
  );

  try {
    const metricAllFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricAllFuncInputParams)
    );
    console.log('METRIC ALL FUNC DATA: ', metricAllFuncResult)

    let metricAllFuncData =
      metricAllFuncResult.MetricDataResults[0].Timestamps.map(
        (timeStamp, index) => {
          return {
            x: timeStamp,
            y: metricAllFuncResult.MetricDataResults[0].Values[index],
          };
        }
      );
    const metricMaxValue = Math.max(
      ...metricAllFuncResult.MetricDataResults[0].Values,
      0
    );
    console.log('METRIC ALL FUNC DATA: ', metricAllFuncData)

    //Request response JSON Object send to the FrontEnd

    metricAllFuncData = {
      title: metricAllFuncResult.MetricDataResults[0].Label,
      data: metricAllFuncData.reverse(),
      options: {
        startTime: metricAllFuncInputParams.StartTime,
        endTime: metricAllFuncInputParams.EndTime,
        graphPeriod,
        graphUnits,
        metricMaxValue,
      },
    };

    console.log('FORMATTED METRIC ALL FUNC DATA', metricAllFuncData)
  } catch (err) {
    console.error('Error in CW getMetricsData All Functions', err);
  }
};
getMetricsAllFunc();