import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { PrismaClient } from '@prisma/client';
import { parse } from 'qs';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const body = parse(req.rawBody).Body;
  const prisma = new PrismaClient();

  if (!body) {
    context.res = {
      status: 400,
      body: 'Your message is empty',
      contentType: 'text/xml',
    };
  }

  const entry = await prisma.entry.create({
    data: {
      content: body as string,
    },
  });

  console.log(entry);

  context.res = {
    body: 'Your response has been saved',
    contentType: 'text/xml',
  };
};

export default httpTrigger;
