import 'dotenv/config';
import { 
	tidy, 
	sum, 
	groupBy, 
	summarize, 
	mean } from "@tidyjs/tidy";
import formatController from './formatController';
import  { middlewareFunction } from '../../types' 

const analysisController: Record<string, middlewareFunction> = {};

analysisController.calcMetrics = async (
	req, res, next
) => {
	const { logs } = res.locals;
	const periodSelection = req.params.period;
	let [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
	const StartTime = formatController.logPeriodConversion[periodSelection];
	graphUnits = graphUnits.slice(0, -1);

	try {
		const vals = tidy(
			logs.streams,
			groupBy(graphUnits, [
				summarize({
					total_duration: sum('Duration') as keyof typeof sum,
					total_billed_duration: sum('Billed Duration') as keyof typeof sum,
					average_duration: mean('Duration') as keyof typeof mean,
					average_billed_duration: mean('Billed Duration') as keyof typeof mean,
					average_memory_used: mean('Max Memory Used') as keyof typeof mean,
					total_pct_memory_used: sum((d) => (Number(d['Max Memory Used' as keyof typeof d]) / Number(d['Memory Size' as keyof typeof d])) * 100),
					avg_pct_memory_used: mean((d) => (Number(d['Max Memory Used' as keyof typeof d]) / Number(d['Memory Size' as keyof typeof d])) * 100),
					total_memory_overallocated: sum((d) => (Number(d['Memory Size' as keyof typeof d]) - Number(d['Max Memory Used' as keyof typeof d]))),
				})
			]),
		)
		
		res.locals.data = vals
		// res.locals.toBeCached = res.locals.data
	
		return next();
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

analysisController.calcMemoryUsage = async (
	req, res, next
) => {
	const { logs, funcNames } = res.locals;
	const periodSelection = req.params.period;
	let [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
	const StartTime = formatController.logPeriodConversion[periodSelection];
	graphUnits = graphUnits.slice(0, -1);

	const summarizedData = [];
	
	// Vectorize calculation to find the average memory_usage for each function
	// at each interval
	try {
		for (const func of logs) {
			const summary = tidy(
				func.streams,
				groupBy(graphUnits, [
					summarize({
						memory_usage: mean((d) => (Number(d['Max Memory Used' as keyof typeof d]) / Number(d['Memory Size' as keyof typeof d])) * 100),
					})
				]),
			)
			func.streams = summary;
			summarizedData.push(func)
		}
		
		// Create object with lambda function names as keys, values set to 0
		// Initializing values for each interval so that there are no missing values
		// in graphs
		const funcNameObj: {[key:string]:number} = {};
		for (const func of funcNames) {
			funcNameObj[func] = 0;
		}
		
		// Initialize output as array of objects
		const formattedOutput: {[key:string]:number}[] = [];
		let date = new Date(StartTime)
		let formattedStart = 0;

		// Iterate from StartTime to graphPeriod to initialize array of objects
		// containing appropriate period-intervals for aggregating function data
		for (let k = 0; k < graphPeriod; k++) {
			// Create object for each interval
			if (graphUnits === 'day') {
				formattedStart = date.getDate();
				date.setDate(date.getDate() + 1)
			} else if (graphUnits === 'hour') {
				formattedStart = date.getHours()
				date.setHours(date.getHours() + 1)
			} else if (graphUnits === 'minute') {
				formattedStart = date.getMinutes()
				date.setMinutes(date.getMinutes() + 1)
			}
			formattedOutput.push({
				xkey: formattedStart,
				...funcNameObj 
			})
		}

		// Iterate over each lambda function
		for (let i = 0; i < summarizedData.length; i++) {

			// Iterate over each data point for interval (i.e. hour, day) for 
			// function, where function is output[i]
			for (let j = 0; j < summarizedData[i].streams.length; j++) {

				// Assign memory_usage value to key of lambda function name for given 
				// period (minute, hour, day -- graphUnits)
				formattedOutput[j][`${summarizedData[i].name}`] = summarizedData[i].streams[j].memory_usage;
			}
		}
		res.locals.data = formattedOutput;
		res.locals.toBeCached = res.locals.data;
	
		return next();
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

analysisController.calcMeanMemoryUsageTotal = async (
	req, res, next
) => {
	const { logs, funcNames } = res.locals;
	const periodSelection = req.params.period;
	let [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
	const StartTime = formatController.logPeriodConversion[periodSelection];
	graphUnits = graphUnits.slice(0, -1);

	const summarizedData = [];
	console.log('\nLOGS: ', logs[0].streams);

	// Vectorize calculation to find the average memory_usage for each function
	// at each interval
	try {
		for (const func of logs) {
			const summary = tidy(
				func.streams,
					summarize({
						memory_usage: mean((d) => (Number(d['Max Memory Used' as keyof typeof d]) / Number(d['Memory Size' as keyof typeof d])) * 100),
					})
			)
			func.streams = summary;
			summarizedData.push(func)
		}
		/* TODO if we decide to move forward with period-level totals */
	
		return next();
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

analysisController.calcLambdaMemoryDiff = async (
	req, res, next
) => {
	const { logs, funcNames } = res.locals;
	const periodSelection = req.params.period;
	let [ graphPeriod, graphUnits ] = formatController.periodDefinitions[periodSelection];
	const StartTime = formatController.logPeriodConversion[periodSelection];
	graphUnits = graphUnits.slice(0, -1);

	const summarizedData = [];
	console.log('\nLOGS: ', logs[0].streams);

	// Vectorize calculation to find the average memory_usage for each function
	// at each interval
	try {
		for (let func of logs) {
			const summary = tidy(
				func.streams,
					summarize({
						[`used${func.name}`]: mean((d) => (Number(d['Max Memory Used' as keyof typeof d]))),
						[`allo${func.name}`]: mean((d) => (Number(d['Memory Size' as keyof typeof d]))),
						[`diff${func.name}`]: mean((d) => ( Number(d['Memory Size' as keyof typeof d]) - Number(d['Max Memory Used' as keyof typeof d]))),
					})
			)
			summarizedData.push({
				name: func.name,
				...summary[0]
			})
		}
		
		res.locals.data = summarizedData;
		res.locals.toBeCached = res.locals.data
	
		return next();
	} catch (err) {
		console.log(err)
		return next(err)
	}
}

export default analysisController;