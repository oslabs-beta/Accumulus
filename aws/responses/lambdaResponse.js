
const lambdaResponses = {};
lambdaResponses.allFunctions = {
  '$metadata': {
    httpStatusCode: 200,
    requestId: '79dc8e1f-8caf-44ad-875f-8a94c2381041',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0
  },
  Functions: [
    {
      Architectures: [Array],
      CodeSha256: 'sK24mNsnD9jZhhLxdRh+7R2Qr4f/Qyb1Vmcyo5fhGCo=',
      CodeSize: 6758623,
      DeadLetterConfig: undefined,
      Description: '',
      Environment: undefined,
      EphemeralStorage: [Object],
      FileSystemConfigs: undefined,
      FunctionArn: 'arn:aws:lambda:us-east-2:545006002224:function:seqbase:$LATEST',
      FunctionName: 'seqbase',
      Handler: 'app.main.handler',
      ImageConfigResponse: undefined,
      KMSKeyArn: undefined,
      LastModified: '2021-06-28T08:11:16.669+0000',
      LastUpdateStatus: undefined,
      LastUpdateStatusReason: undefined,
      LastUpdateStatusReasonCode: undefined,
      Layers: undefined,
      MasterArn: undefined,
      MemorySize: 128,
      PackageType: 'Zip',
      RevisionId: '7e60f9a2-64d5-4104-b4cd-a7c8d94c0997',
      Role: 'arn:aws:iam::545006002224:role/service-role/seqbase-role-fryd0dwb',
      Runtime: 'python3.8',
      SigningJobArn: undefined,
      SigningProfileVersionArn: undefined,
      State: undefined,
      StateReason: undefined,
      StateReasonCode: undefined,
      Timeout: 3,
      TracingConfig: [Object],
      Version: '$LATEST',
      VpcConfig: undefined
    },
    {
      Architectures: [Array],
      CodeSha256: 'r4GAv6pjPcIGI7riaUt2LmgN4AvCNtFjoApHAH2/oUA=',
      CodeSize: 443,
      DeadLetterConfig: undefined,
      Description: 'A starter AWS Lambda function.',
      Environment: undefined,
      EphemeralStorage: [Object],
      FileSystemConfigs: undefined,
      FunctionArn: 'arn:aws:lambda:us-east-2:545006002224:function:myLambdaFunc:$LATEST',
      FunctionName: 'myLambdaFunc',
      Handler: 'lambda_function.lambda_handler',
      ImageConfigResponse: undefined,
      KMSKeyArn: undefined,
      LastModified: '2022-04-21T19:35:00.676+0000',
      LastUpdateStatus: undefined,
      LastUpdateStatusReason: undefined,
      LastUpdateStatusReasonCode: undefined,
      Layers: undefined,
      MasterArn: undefined,
      MemorySize: 128,
      PackageType: 'Zip',
      RevisionId: 'f8b0cc5a-2b2d-40d9-88a8-f812099e278c',
      Role: 'arn:aws:iam::545006002224:role/service-role/myLambdaFunc-role-r8wdnmjv',
      Runtime: 'python3.7',
      SigningJobArn: undefined,
      SigningProfileVersionArn: undefined,
      State: undefined,
      StateReason: undefined,
      StateReasonCode: undefined,
      Timeout: 3,
      TracingConfig: [Object],
      Version: '$LATEST',
      VpcConfig: undefined
    }
  ],
  NextMarker: undefined
}

lambdaResponses.formatted = [
  {
    name: 'helloWorldFunction',
    description: 'A starter AWS Lambda function.',
    size: 443,
    memoryAllocated: 128,
    ephemeral: { Size: 512 },
    timeout: 3,
    lastModified: '2022-04-25T15:23:38.868+0000'
  }
]

export default lambdaResponses;