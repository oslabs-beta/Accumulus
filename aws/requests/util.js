import 'dotenv/config';
const util = {};

util.getAwsCreds = () => {
  const account = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    }
  }
  return account
}

export default util;