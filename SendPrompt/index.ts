import 'dotenv/config';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const message = await client.messages.create({
    body: 'What are three things to which you are grateful for today?',
    from: '+12565593246',
    to: '+13852950754',
  });

  context.res = {
    body: `Message ${message.sid} was sent.`,
  };
};

export default httpTrigger;
