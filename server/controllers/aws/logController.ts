import 'dotenv/config';
import express from 'express';
import moment from 'moment';
import {
  CloudWatchLogsClient,
	FilterLogEventsCommand,
	DescribeLogStreamsCommand,
} from '@aws-sdk/client-cloudwatch-logs';

import formatController from './formatController';

const logController: any = {};

logController.getLambdaLogs = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { credentials } = res.locals;
  const { region } = req.body;
  const periodSelection = req.params.period;
  const funcName = req.params.function;
  const logGroupName = `/aws/lambda/${funcName}`; // Reconfig this;
  const StartTime = formatController.logPeriodConversion[periodSelection];

  const cwClient = new CloudWatchLogsClient({
    region,
    credentials,
  });

  // nextToken is a parameter specified by AWS CloudWatch for the FilterLogEventsCommand; this token is needed to fetch the next set of events
  // helperFunc provides a recursive way to get all the logs
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

		// if we received a nextToken, start helperFunc to recursively parse through most recent data (meaning we grab data from the end since that is the most recent log stream)
		if (logEvents.nextToken) {
			const helperFuncResults = await logController.getLogsHelper(
        logEvents.nextToken, 
        [],
        logGroupName, 
        cwClient,
        StartTime);

			// poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
			let poppedEl;

			// while we still have logs to grab from the helperFunc and shortenedEvents is shorter than 50 logs, add to shortenedEvents array from the end (the most recent log stream)
			while (
				helperFuncResults.length &&
				shortenedEvents.length <= 50
			) {
				// poppedEl gets the most recent log stream that currently exists in helperFunc (log streams that are even more recent will have already been added to shortenedEvents)
				// but the for loop below is iterating through helperFunc such that we are adding the most recent log stream at the beginning of the shortenedEvent array
				poppedEl = helperFuncResults.pop();
				for (let i = poppedEl.length - 1; i >= 0; i -= 1) {
					// we don't want to have more than 50 logs at any point in time to reduce operational load and size
					if (shortenedEvents.length === 50) break;
					else shortenedEvents.push(poppedEl[i]);
				}
			}
		}
		/**
		 * If a nextToken exists, we can't populate shortenedEvents with event log data without the second part of
		 * the or clause since we want to consider the situation when there are < 50 event log streams;
		 */
		if (!logEvents.nextToken || shortenedEvents.length < 50) {
			// grab from the end to grab most recent logs and stop once we reach 50 to send back to frontend
			for (let i = logEvents!.events!.length - 1; i >= 0; i -= 1) {
				if (shortenedEvents.length === 50) break;
				shortenedEvents.push(logEvents!.events![i]);
			}
		}

		let streams = [];
    
		// loop through logs in order to eventually add to eventLog object
		for (let i = 0; i < shortenedEvents.length; i += 1) {
			// the very first shortenedEvent element is the most recent log stream
			let eventObj = shortenedEvents[i];
			// create the individual arrays to populate the table; note that this will represent a single row of info (log stream name + time stamp + stream message)
			const dataArr = [];
			// cut off the last five characters from the log stream name to create an identifier for this specific log stream
			// note that logStreamName appears before the timestamp
			dataArr.push('...' + eventObj.logStreamName.slice(-5));
			// format('lll') creates a human readable date from the specific log stream's timestamp
			dataArr.push(moment(eventObj.timestamp).format('lll'));

			// if message is just from a normal log, remove the first 67 characters of the message as it's all just metadata/a string of timestamps and unnecessary info
			if (
				eventObj.message.slice(0, 4) !== 'LOGS' &&
				eventObj.message.slice(0, 9) !== 'EXTENSION'
			)
				dataArr.push(eventObj.message.slice(67));
			// messages starting with LOGS or EXTENSION represents different/pertinent info and we don't want to mutate the message like we did within the if block just above
			else dataArr.push(eventObj.message);
			// push the formatted dataArr into the outer array, streams, to make the table for our logs
			streams.push(dataArr);
		}

    // Log output structure
    interface IEventLog {
      name: string,
      timePeriod: string,
      streams: string[][],
      errors: string[][]
    }
		const eventLog: IEventLog = {
			name: funcName,
			timePeriod: periodSelection,
      streams: streams,
      errors: [],
		};
    
		// get error logs
		try {
			const errorEvents = await cwClient.send(
				new FilterLogEventsCommand({
					logGroupName,
					endTime: new Date().valueOf(),
					startTime: StartTime,
					filterPattern: 'ERROR',
				})
			);
			const errorStreams = [];
			// grab from the end to sort the most recent first
			for (let i = errorEvents!.events!.length - 1; i >= 0; i -= 1) {
				let errorObj = errorEvents!.events![i];
				const rowArr = [];
				// just cut off the last five characters for the log stream name as an identifier
				rowArr.push('...' + errorObj!.logStreamName!.slice(-5));
				// format the date of the log timestamp to be more readable
				rowArr.push(moment(errorObj.timestamp).format('lll'));
				// remove the first 67 characters as it's all just metadata/a string of timestamps and unnecessary info
				rowArr.push(errorObj!.message!.slice(67));
				errorStreams.push(rowArr);
			}

			eventLog.errors = errorStreams;
      console.log('EVENT LOG: ', eventLog)
      res.locals.logs = eventLog;
			return next();
			// return next();
		} catch (err) {
			if (err) {
				console.error(err);

				return err
			}
		}
	} catch (err) {
		if (err) console.error(err);
		return err
	}
}


logController.getLogsHelper = async (
  nextToken: string, 
  data: string[],
  logGroupName: string, 
  cwClient: any,
  StartTime: number) => {
  
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
  return logController.getLogsHelper(nextLogEvents.nextToken, data, logGroupName, cwClient, StartTime);
}

export default logController;