/* eslint-disable no-param-reassign */
import { createLogger, format, Logger, transports } from 'winston';

import { TransformableInfo } from 'logform';
import { getRequestContext } from './trackId';

const traceFormat = format((info: TransformableInfo) => {
  const requestInfo = getRequestContext();
  if (requestInfo && requestInfo.trackId) {
    info.trackId = requestInfo.trackId;
  }
  return info;
});


const getLevel = () => {
  let level = 'info';
  switch (process.env.NODE_ENV) {
    case "production":
      level = "warning";
      break;
    case "test":
      level = "emerg";
      break;
    default:
      level = "debug";
      break;
  }
  return level;
}
const getSilent = () => {
  let silent = false;
  switch (process.env.NODE_ENV) {
    case "production":
      silent = false;
      break;
    case "test":
      silent = true;
      break;
    default:
      silent = false;
      break;
  }
  return silent;
}

const initLogger = (name: string, version: string): Logger => {
  const logger: Logger = createLogger({
    level: getLevel(),
    silent: getSilent(),
    format: format.combine(traceFormat(), format.timestamp(), format.json()),
    defaultMeta: { service: name, version },
    transports: [new transports.Console()],
  });

  return logger;
};

export default initLogger;
