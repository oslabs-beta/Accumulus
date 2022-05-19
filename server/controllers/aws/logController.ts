import 'dotenv/config';
import express from 'express';
import moment from 'moment';
import {
  CloudWatchLogsClient,
  FilterLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';

import formatController from './formatController';

const logController: any = {};

interface IEventLog {
  id: string;
  date: Date;
  message: string;
}

logController.getLambdaLogsByFunc = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const periodSelection = req.params.period;
  const funcName = req.params.function;
  const logGroupName = `/aws/lambda/${funcName}`;
  const StartTime = formatController.logPeriodConversion[periodSelection];

  const cwClient = new CloudWatchLogsClient({
    region,
    credentials,
  });

  try {
    const logs = await logController.getLambdaLogsGeneric(
      cwClient,
      funcName,
      logGroupName,
      StartTime,
      periodSelection
    );
    res.locals.logs = logs;
    res.locals.toBeCached = res.locals.logs;

    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

logController.getLambdaLogsGeneric = async (
  cwClient: any,
  funcName: string,
  logGroupName: string,
  StartTime: number,
  periodSelection: string
) => {
  // nextToken is a parameter specified by AWS CloudWatch for the FilterLogEventsCommand;
  // this token is needed to fetch the next set of events helperFunc provides a
  // recursive way to get all the logs
  try {
    // find the logEvents with given logGroupName and time period
    const logEvents = await cwClient.send(
      new FilterLogEventsCommand({
        logGroupName,
        endTime: new Date().valueOf(),
        startTime: StartTime,
        filterPattern: 'REPORT',
      })
    );

    // only send back most recent 50 logs to reduce size of payload
    const shortenedEvents = [];

    // if we received a nextToken, start helperFunc to recursively parse through
    // most recent data (meaning we grab data from the end since that is the most
    // recent log stream)
    if (logEvents.nextToken) {
      const helperFuncResults = await logController.getLogsHelper(
        logEvents.nextToken,
        [],
        logGroupName,
        cwClient,
        StartTime
      );

      // poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
      let poppedEl;

      // while we still have logs to grab from the helperFunc and shortenedEvents is shorter than 50 logs, add to shortenedEvents array from the end (the most recent log stream)
      while (helperFuncResults.length && shortenedEvents.length <= 50) {
        // poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
        // but the for loop below is iterating through helperFunc such that we are adding the most recent log stream at the beginning of the shortenedEvent array
        poppedEl = helperFuncResults.pop();
        for (let i = poppedEl.length - 1; i >= 0; i -= 1) {
          // we don't want to have more than 50 logs at any point in time to reduce operational load and size
          // if (shortenedEvents.length === 50) break;
          // else shortenedEvents.push(poppedEl[i]);
          shortenedEvents.push(poppedEl[i]);
        }
      }
    }
    /**
     * If a nextToken exists, we can't populate shortenedEvents with event log
     * data without the second part of
     * the or clause since we want to consider the situation when there are < 50
     * event log streams;
     */
    if (!logEvents.nextToken || shortenedEvents.length < 50) {
      // grab from the end to grab most recent logs and stop once we reach 50
      // to send back to frontend
      for (let i = logEvents!.events!.length - 1; i >= 0; i -= 1) {
        if (shortenedEvents.length === 50) break;
        shortenedEvents.push(logEvents!.events![i]);
      }
    }

    let streams = [];

    // loop over logs
    for (let i = 0; i < shortenedEvents.length; i += 1) {
      const eventObj = shortenedEvents[i];
      const date = new Date(moment(eventObj.timestamp).format());
      const singleLog: IEventLog = {
        id: eventObj.logStreamName,
        date: date,
        message: eventObj.message,
      };
      const formattedLog = logController.formatLogs(singleLog);
      streams.push(formattedLog);
    }

    // Log output structure
    interface ILogCollection {
      name: string;
      timePeriod: string;
      streams: IEventLog[];
      errors: string[][];
    }
    const eventLog: ILogCollection = {
      name: funcName,
      timePeriod: periodSelection,
      streams: streams,
      errors: [],
    };

    // get error logs
    eventLog.errors = await logController.getLambdaErrorLogs(
      cwClient,
      logGroupName,
      StartTime
    );
    return eventLog;
  } catch (err) {
    if (err) console.error(err);
    return err;
  }
};

logController.formatLogs = (log: IEventLog) => {
  const splitMessage = log.message.split('\t').slice(0, -1);
  const keys = splitMessage.map((el) => el.split(':')[0]);
  const values = splitMessage.map((el) => el.split(':')[1]);

  interface IFormattedLog {
    'REPORT RequestId': string;
    Date: Date;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    Duration: number;
    'Billed Duration': number;
    'Memory Size': number;
    'Max Memory Used': number;
    'Init Duration': number;
  }

  // Format output - 1st key is date, 2nd is UUID, 3-7 are lambda metrics
  const date = new Date(log.date);
  let object: any = {
    Date: date,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }; // Refactor for typescript
  object[keys[0]] = values[0]; // UUID is string - no type coercion
  for (let i = 1; i < keys.length; i++) {
    // lambda metrics convert to number and drop the data labels: ms, MB
    object[keys[i]] = Number(values[i].split(' ')[1]);
  }

  return object;

  /* Data types for metrics */
  // ---
  // Duration: milliseconds (ms)
  // Billed Duration: milliseconds (ms)
  // Memory Size: megabytes (MB)
  // Max Memory Used: megabytes (MB)
  // Init Duration: milliseconds (ms)
};

logController.getLogsHelper = async (
  nextToken: string,
  data: string[],
  logGroupName: string,
  cwClient: any,
  StartTime: number
) => {
  // once we run out of nextTokens, return data (base case)
  if (!nextToken) {
    return data;
  }

  const nextLogEvents = await cwClient.send(
    // FilterLogEventsCommand is a class that lists log events from a specified
    // log group, which can be filtered using a filter pattern, a time range,
    // and/or the name of the log stream
    // by default this lists logs up to 1 megabyte of log events (~10,000 log events)
    // but we are limiting the data to the most recent 50 log events
    // query will return results from LEAST recent to MOST recent
    new FilterLogEventsCommand({
      logGroupName,
      endTime: new Date().valueOf(),
      startTime: StartTime,
      nextToken,
      // START, END, REPORT are keywords that appear at the start of the message
      // for specific log events and our filter pattern detects only these events
      // to be included in our logs
      filterPattern: 'REPORT',
    })
  );
  data.push(nextLogEvents.events);
  return logController.getLogsHelper(
    nextLogEvents.nextToken,
    data,
    logGroupName,
    cwClient,
    StartTime
  );
};

logController.getLambdaErrorLogs = async (
  cwClient: any,
  logGroupName: string,
  StartTime: number
) => {
  /* 
		This is a generic func to allow error logs to be returned to multiple 
		functions in logController
	*/

  const errorEvents = await cwClient.send(
    new FilterLogEventsCommand({
      logGroupName,
      endTime: new Date().valueOf(),
      startTime: StartTime,
      filterPattern: 'ERROR',
    })
  );

  interface IErrorLog {
    id: string;
    date: string;
    message: string;
  }

  const errorLogs = [];
  for (let i = errorEvents!.events!.length - 1; i >= 0; i -= 1) {
    const errorObj = errorEvents!.events![i];
    const rowArr: IErrorLog = {
      id: errorObj!.logStreamName!,
      date: moment(errorObj.timestamp).format(),
      message: errorObj!.message!,
    };
    errorLogs.push(rowArr);
  }

  return errorLogs;
};

logController.getLambdaErrorsByFunc = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const periodSelection = req.params.period;
  const funcName = req.params.function;
  const logGroupName = `/aws/lambda/${funcName}`;
  const StartTime = formatController.logPeriodConversion[periodSelection];

  const cwClient = new CloudWatchLogsClient({
    region,
    credentials,
  });

  try {
    const errorLogs = await logController.getLambdaErrorLogs(
      cwClient,
      logGroupName,
      StartTime
    );

    res.locals.logs = errorLogs;
    return next();
  } catch (err) {
    if (err) {
      console.error(err);
      return next({ err });
    }
  }
};

logController.getLambdaErrorsEachFunc = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const funcNamesArr = res.locals.funcNames;
  const { credentials } = res.locals;
  const { region } = req.body;
  const periodSelection = req.params.period;
  const StartTime = formatController.logPeriodConversion[periodSelection];

  const cwClient = new CloudWatchLogsClient({
    region,
    credentials,
  });

  try {
    interface IFormattedErrorLog {
      function: string;
      logs: string[];
    }
    let errorLogs: IFormattedErrorLog[] = [];

    // Iterate over lambda function names
    for (let i = 0; i < funcNamesArr.length; i++) {
      // Pull error logs for each (array of objects)
      const logs = await logController.getLambdaErrorLogs(
        cwClient,
        `/aws/lambda/${funcNamesArr[i]}`,
        StartTime
      );

      // Push formatted logs to errorLogs array
      errorLogs.push({
        function: funcNamesArr[i],
        logs: logs,
      });
    }

    res.locals.logs = errorLogs;
    res.locals.toBeCached = res.locals.logs;
    return next();
  } catch (err) {
    if (err) {
      console.error(err);
      return next({ err });
    }
  }
};

logController.getLambdaUsageEachFunc = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const funcNamesArr = res.locals.funcNames;
  const { credentials } = res.locals;
  const { region } = req.body;
  const periodSelection = req.params.period;
  const StartTime = formatController.logPeriodConversion[periodSelection];

  const cwClient = new CloudWatchLogsClient({
    region,
    credentials,
  });

  try {
    let memoryLogs = [];

    // Iterate over lambda function names
    for (let i = 0; i < funcNamesArr.length; i++) {
      // Pull error logs for each (array of objects)
      const logs = await logController.getLambdaLogsGeneric(
        cwClient,
        funcNamesArr[i],
        `/aws/lambda/${funcNamesArr[i]}`,
        StartTime,
        periodSelection
      );

      // Push logs to memoryLogs array
      memoryLogs.push(logs);
    }

    res.locals.logs = memoryLogs;
    return next();
  } catch (err) {
    if (err) {
      console.error(err);
      return next({ err });
    }
  }
};

export default logController;
