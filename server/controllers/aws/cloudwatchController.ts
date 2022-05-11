import 'dotenv/config';
import express from 'express';
import formatController from './formatController';
import {
  CloudWatchClient,
  GetMetricDataCommand,
} from '@aws-sdk/client-cloudwatch';
import { tidy, groupBy, summarize, sum } from "@tidyjs/tidy";
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
  const [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];

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
  const [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
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

  // console.log('\nINPUT: ', metricByFuncInputParams)
  // console.log('\nINPUT metricstat: ', metricByFuncInputParams.MetricDataQueries[0].MetricStat)

  try {
    const metricByFuncResult = await cwClient.send(
      new GetMetricDataCommand(metricByFuncInputParams)
    );
    console.log('RESULT: ', metricByFuncResult)

    const metricByFuncData = metricByFuncResult!.MetricDataResults!.map(
      (metricDataResult) => {
        const metricName = metricDataResult.Label;
        const timeStamps = metricDataResult!.Timestamps!.reverse();
        const values = metricDataResult!.Values!.reverse();
        const metricData = timeStamps.map((timeStamp, index) => {
          
          return {
            month: formatController.monthConversion[timeStamp.getMonth()],
            day: timeStamp.getDate(),
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
      // console.log('METRIC FUNC DATA: ', metricByFuncData[0].data)
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
    console.log('FINAL DATA: ', res.locals.metricByFuncData.series[1].data)
    // console.log('FINAL DATA: ', res.locals.metricByFuncData.series[3].data)
    console.log('FINAL DATA: ', res.locals.metricByFuncData)
    // console.log('start: ', res.locals.metricByFuncData.options.startTime)
    // console.log('start day: ', res.locals.metricByFuncData.options.startTime.getDate())
    // console.log('start day: ', res.locals.metricByFuncData.options.startTime.getMonth() + 1)
    // console.log('end: ', res.locals.metricByFuncData.options.endTime)
    // console.log('period: ', res.locals.metricByFuncData.options.graphPeriod)
    // console.log('units: ', res.locals.metricByFuncData.options.graphUnits)

    let curDate = res.locals.metricByFuncData.options.startTime;
    const endDate = res.locals.metricByFuncData.options.endTime;
    
    let dayRecords = [];
    // console.log('curDate: ', curDate)
    // console.log('curDate: ', curDate.getDate())
    // console.log('curDate: ', curDate.getMonth())
    // console.log('endDate: ', endDate)
    // console.log('endDate: ', endDate.getDate())
    // console.log('endDate: ', endDate.getMonth())
    interface MetricDataObj {
      month: number,
      day: number,
      hour: number,
      minute: number,
      function?: number
    }

    // const [ 
    //   curMicroPeriod, 
    //   endMicroPeriod, 
    //   curMacroPeriod, 
    //   endMacroPeriod ] = formatController.aggregateFuncByPeriodConversion(periodSelection, curDate, endDate)
    //   console.log(curMicroPeriod)
    //   console.log(curMacroPeriod)
    //   console.log(endMicroPeriod)
    //   console.log(endMacroPeriod)
    // while (curMicroPeriod < endMicroPeriod|| curMacroPeriod < endMacroPeriod) {
    //   const monthStr = formatController.monthConversion[curMacroPeriod];
    //   let obj: MetricDataObj = {
    //     month: monthStr,
    //     day: curMicroPeriod,
    //     hour: 0,
    //     minute: 0,
    //   };
    //   let dayMatches = [];
    //   for (const func of res.locals.metricByFuncData.series) { // n number of functions
    //     for (const record of func.data) { // m number of records

    //       // check to see if current record's month is current month of 
    //       // iteration and day is current day of iteration (in while loop) 
    //       if (record.month === monthStr && record.day === curMicroPeriod) {
    //         // if so, push whole record { month: 'May', ... func: 0 } to array
    //         dayMatches.push(record)
    //       }
    //     }
    //     // if length of matches is 0
    //     if (dayMatches.length === 0) {
    //       // set func val for day is 0
    //       obj[func.name as 'function'] = 0;
    //     } else {
    //       // else
    //       // aggregate sum of func val for all records into one
    //       const summed = tidy(
    //         dayMatches,
    //         groupBy('day',
    //           summarize({ 
    //             total: sum(func.name)
    //           })),
    //       )
    //       // set func val for day as aggregated sum
    //       obj[func.name as 'function'] = summed[0].total;
    //     }
    //   }
    //   dayRecords.push(obj)
    //   curDate.setDate(curMicroPeriod + 1)
    // }
    // console.log('dayRecords: ', dayRecords);

    return next();

  } catch (err) {
    console.error('Error in CW getMetricsData By Functions', err);
  }
};

cwController.rankFuncsByMetric = async(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const graphMetricName = req.params.metric;
  const graphMetricStat = req.params.stat;
  const periodSelection = req.params.period;
  const [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
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
}

cwController.getLambdaLogs = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  
}
export default cwController;
