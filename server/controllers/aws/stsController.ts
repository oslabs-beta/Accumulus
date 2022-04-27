import { STSClient } from '@aws-sdk/client-sts';
import utilController from './utilController';

let account = utilController.getAwsCreds;
let { region, credentials } = account;

const stsClient = new STSClient({
  region: region,
  credentials: credentials,
});

export default stsClient;
