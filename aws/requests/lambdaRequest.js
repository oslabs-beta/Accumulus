// set up .env file accessibility
require('dotenv').config()
const lambda = require('@aws-sdk/client-lambda');


const getAwsAccount = (req, res, next) => {
  const account = {
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  	}
  }
  
  return account;
}

const getFunctions = async (req, res, next) => {
  const account = getAwsAccount();
  const client = new lambda.LambdaClient({
    region: account.region,
    credentials: account.credentials
  });

  const iam = { FunctionVersion: 'ALL' }; // get published and unpublished lambda funcs

  try {
    const listOfLambdaFuncs = await client.send(
      new lambda.ListFunctionsCommand(iam)
    )
    .then(data => {

      console.log(data)
      const funcNames = data.Functions.map(el => el.FunctionName);

      let funcData = [];
      for (let i = 0; i < data.Functions.length; i++) {
        funcData.push({
          name: data.Functions[i].FunctionName,
          description: data.Functions[i].Description,
          size: data.Functions[i].CodeSize,
          memoryAllocated: data.Functions[i].MemorySize,
          timeout: data.Functions[i].Timeout,
          ephemeral: data.Functions[i].EphemeralStorage,
          lastModified: data.Functions[i].LastModified
        })
      }

      return Promise.resolve(funcData);
    })
    .then(funcs => {
      console.log(funcs)
    })


  } catch (err) {
    console.error('Error in Lambda List Functions: ', err);
    return err;
  }
};

getFunctions();