import 'dotenv/config';
import express from 'express';
import {
  CloudWatchLogsClient,
	FilterLogEventsCommand,
} from '@aws-sdk/client-cloudwatch-logs';
import { 
	tidy, 
	sum, 
	groupBy, 
	summarize, 
	distinct, 
	mean } from "@tidyjs/tidy";
import formatController from './formatController';

// const analysisController: any = {};
const analysisController = {};

analysisController.calcMetrics = async (
	// req: express.Request,
  // res: express.Response,
  // next: express.NextFunction
	req, res, next
) => {
	const { logs } = res.locals;
	const periodSelection = req.params.period;
	let [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
	const StartTime = formatController.logPeriodConversion[periodSelection];
	graphUnits = graphUnits.slice(0, -1);
	console.log(graphUnits)

	// interface IMetricLog {
	// 	total_duration: number;
	// 	total_billed_duration: number;
	// 	average_duration: number;
	// 	average_billed_duration: number;
	// 	average_memory_used: number;
	// 	total_pct_memory_used: number;
	// 	avg_pct_memory_used: number;
	// 	total_memory_overallocated: number;
	// }
	try {
		const vals = tidy(
			logs.streams,
			groupBy(graphUnits, [
				summarize({ 
					total_duration: sum('Duration'),
					total_billed_duration: sum('Billed Duration'),
					average_duration: mean('Duration'),
					average_billed_duration: mean('Billed Duration'),
					average_memory_used: mean('Max Memory Used'),
					total_pct_memory_used: sum( (d) => (d['Max Memory Used'] / d['Memory Size']) * 100),
					avg_pct_memory_used: mean( (d) => (d['Max Memory Used'] / d['Memory Size']) * 100),
					total_memory_overallocated: sum( (d) => (d['Memory Size'] - d['Max Memory Used']) ),
				})
			]),
		)
		
		res.locals.data = vals
	
		return next();
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

export default analysisController;