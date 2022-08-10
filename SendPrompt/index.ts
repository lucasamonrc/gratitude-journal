import 'dotenv/config';
import { AzureFunction, Context } from '@azure/functions';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  if (myTimer.isPastDue) {
    context.log('Timer function is running late!');
  }

  const message = await client.messages.create({
    body: 'What are three things to which you are grateful for today?',
    from: '+12565593246',
    to: '+13852950754',
  });

  context.log(`Message ${message.sid} was sent.`);
};

export default timerTrigger;
