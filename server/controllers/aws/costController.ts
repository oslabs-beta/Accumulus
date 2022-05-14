import express from 'express';
import formatController from './formatController';

const costController: any = {};

costController.calcCost = (
  invocations: number,
  duration: number,
  memory: number,
  ephemeral: number,
  architectures: string,
  region: string
): number => {
  // x86 Price - $0.0000166667 for every GB-second - $0.20 per 1M requests
  // Arm Price - $0.0000133334 for every GB-second - $0.20 per 1M requests

  // Ephemeral Storage - $0.0000000309 for every GB-second

  // Gb-s = duration[ms] / 1000 * (memory allocated / 1024) [Gb]
  // cost = 0.0000166667 * GB-s + 0.0000000309 * GB-s + Invocations / 1000000 * 0.20

  let ephFactor = region === 'us-west-1' ? 0.000000037 : 0.0000000309;
  let reqFactor = 0.2;
  let memFactor = architectures === 'x86_64' ? 0.0000166667 : 0.0000133334;
  let GbsecsCompute = (duration / 1000) * (memory / 1024);
  let GbsecsStorage = (duration / 1000) * (ephemeral / 1024);
  let cost =
    memFactor * GbsecsCompute +
    ephFactor * GbsecsStorage +
    (invocations / 1000000) * reqFactor;
  return cost;
};

costController.calcCostEachLambda = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { region } = req.body;

  // Data[i] signature
  // interface IData {
  //   id: number,
  //   xkey: string,
  //   LoginUser: number,
  //   InvokeLambdaFuncs: number,
  //   ProcessPurchase: number,
  //   RegisterUser: number,
  //   GetMetrics: number,
  //   helloWorldFunction: number,
  //   AnalyzeData: number,
  // }

  // Invocation data is being mutated!!!
  const cost = res.locals.Invocations;
  cost.title = 'Lamda Costs';
  
  const costData = res.locals.Invocations.series[0].data;
  const invocationData = res.locals.Invocations.series[0].data;
  const durationData = res.locals.Duration.series[0].data;
  const lambdaFuncs = res.locals.lambdaFunctions;

  for (let i = 0; i < costData.length; i++) {
    let total = 0;
    for (let j = 0; j < lambdaFuncs.length; j++) {
      const name = lambdaFuncs[j].name;
      const architectures = lambdaFuncs[j].architectures[0];
      const memory = lambdaFuncs[j].memoryAllocated;
      const ephemeral = lambdaFuncs[j].ephemeral.Size;
      let calcCost = costController.calcCost(
        invocationData[i][name],
        durationData[i][name],
        memory,
        ephemeral,
        architectures,
        region
      );
      costData[i][name] = calcCost;
      total += calcCost;
      // console.log(total);
    }

    costData[i].value = total;
  }
  res.locals.costData = cost;
  // console.log(res.locals.lambdaFunctions);
  // console.log(res.locals.Invocations);
  // console.log(res.locals.Duration);
  next();
};

export default costController;

// Client Pricing API

// //this is an array containing all listed lambdaFunctions
// const { lambdaFunctions } = res.locals;
// const { credentials } = res.locals;
// const { region } = req.body;
// //get :period from req params
// const totalCostPeriod = req.params.period;
// console.log(lambdaFunctions);
// console.log('entered costController.calcCostTotalLambda');
// // ----------describe-services params---------WHAT GOES HERE?!?!?!?!
// //   const params = {
// //     FormatVersion: ‘aws_v1’,
// //     MaxResults: 100,
// //     // NextToken: ‘ALL’,
// //     ServiceCode: ‘AmazonEC2’
// //   };
// //   const costClient = new PricingClient({
// //     region,
// //     credentials,
// //   });
// //  const command = new DescribeServicesCommand(params);
// //  console.log(command);
// try {
//   console.log('entered try block in calcCostTotalLambda');
//   // const costAllFuncResult = await costClient.send(command)
//   //.then(data => console.log(data));
//   // console.log(‘costController.calcLambdaCostAll COST ALL FUNC DATA: ’, costAllFuncResult);
//   const totalCost = 'placeholder'; //organize results into usable data
//   res.locals.totalCost = totalCost;
//   next();
// } catch (err) {
//   console.log('costController.calcLamdaCostAll failed to work...');
//   return next(err);
// }
