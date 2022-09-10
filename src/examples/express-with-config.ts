import express from 'express';
import {
  Logger,
  ContextAsyncHooks,
  LoggerTraceability,
  format,
  addColors,
} from '../index';

const colors = {
  info: 'green',
  warn: 'yellow',
  error: 'red',
};
const colorizer = format.colorize();
addColors(colors);

const conf = LoggerTraceability.getLoggerOptions();
const formated = format.combine(
  format.timestamp(),
  format.simple(),
  format.printf(
    msg =>
      `${colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}:`)} ${
        msg.message
      }`,
  ),
);
conf.format = formated;
LoggerTraceability.configure(conf);

const app = express();
const port = 3000;
// ContextAsyncHooks.trackKey = ETrackKey['X-Correlation-ID'];
app.use(ContextAsyncHooks.getExpressMiddlewareTracking());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // Logger.info(`Example app listening at http://localhost:${port}`);
  Logger.info('This is the logger info!');
  Logger.error('This is the logger error!');
  Logger.warn('This is the logger warn!');
});
