
const cwResponses = {}

cwResponses.awsClient = {
  region: 'key-from-env',
  credentials: {
    accessKeyId: 'key-from-env',
    secretAccessKey: 'key-from-env'
  }
}

cwResponses.cwClient = {
  // middlewareStack: {
  //   add: [Function: add],
  //   addRelativeTo: [Function: addRelativeTo],
  //   clone: [Function: clone],
  //   use: [Function: use],
  //   remove: [Function: remove],
  //   removeByTag: [Function: removeByTag],
  //   concat: [Function: concat],
  //   applyToStack: [Function: cloneTo],
  //   resolve: [Function: resolve]
  // },
  // config: {
  //   apiVersion: '2010-08-01',
  //   disableHostPrefix: false,
  //   logger: {},
  //   regionInfoProvider: [AsyncFunction: defaultRegionInfoProvider],
  //   serviceId: 'CloudWatch',
  //   urlParser: [Function: parseUrl],
  //   region: [AsyncFunction: region],
  //   credentials: [Function (anonymous)],
  //   runtime: 'node',
  //   defaultsMode: [AsyncFunction (anonymous)],
  //   base64Decoder: [Function: fromBase64],
  //   base64Encoder: [Function: toBase64],
  //   bodyLengthChecker: [Function: calculateBodyLength],
  //   credentialDefaultProvider: [Function (anonymous)],
  //   defaultUserAgentProvider: [AsyncFunction (anonymous)],
  //   maxAttempts: [AsyncFunction (anonymous)],
  //   requestHandler: NodeHttpHandler { metadata: [Object], configProvider: [Promise] },
  //   retryMode: [AsyncFunction (anonymous)],
  //   sha256: [Function: bound Hash],
  //   streamCollector: [Function: streamCollector],
  //   useDualstackEndpoint: [AsyncFunction (anonymous)],
  //   useFipsEndpoint: [AsyncFunction: useFipsEndpoint],
  //   utf8Decoder: [Function: fromUtf8],
  //   utf8Encoder: [Function: toUtf8],
  //   tls: true,
  //   endpoint: [Function (anonymous)],
  //   isCustomEndpoint: false,
  //   retryStrategy: [AsyncFunction: retryStrategy],
  //   systemClockOffset: 0,
  //   signingEscapePath: true,
  //   signer: [Function: signer],
  //   customUserAgent: undefined
  // }
}


cwResponses.rawMetricData = {
  '$metadata': {
    httpStatusCode: 200,
    requestId: '424f9b84-31d5-4b62-b28e-df7044fc7a7b',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  MetricDataResults: [
    {
      Id: 'mDuration_AllLambdaFunc',
      Label: 'Lambda Duration All Functions',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
      Messages: undefined
    }
  ],
  NextToken: undefined,
  Messages: []
}


cwResponses.funcData = [
  { x: '2022-04-25T19:20:00.000Z', y: 1.59 },
  { x: '2022-04-25T15:25:00.000Z', y: 3.45 }
]


cwResponses.duration = {
  title: 'Lambda Duration All Functions',
  data: [
    { x: '2022-04-25T15:25:00.000Z', y: 3.45 },
    { x: '2022-04-25T19:20:00.000Z', y: 1.59 }
  ],
  options: {
    startTime: '2022-04-25T15:15:00.000Z',
    endTime: '2022-04-26T15:15:00.000Z',
    graphPeriod: 24,
    graphUnits: 'hours',
    metricMaxValue: 3.45
  }
}

export default cwResponses;