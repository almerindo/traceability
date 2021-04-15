import express from 'express';
import traceability from '../index';
import { ITraceability } from './mongoose/model/traceability.interface';
import Schema from './mongoose/schema/traceability.schema';
import { TraceabilityModel } from './mongoose/model/traceability.model';

const { ContextAsyncHooks, Logger } = traceability;

const user: ITraceability = {
  name: 'Steve Jobs',
  status: 'teste',
};

const app = express();
const port = 3000;
app.use(ContextAsyncHooks.getExpressMiddlewareTracking());
app.get('/', async (req, res) => {
  Logger.info('Hello World with trackId on server side!');
  (TraceabilityModel as any).setContext(ContextAsyncHooks.getContext());
  // await (TraceabilityModel as any).create(user);
  res.send('Hello World!');
});

app.listen(port, () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
});
