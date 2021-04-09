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

const initLogger = (name: string, version: string): Logger => {
  const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(traceFormat(), format.timestamp(), format.json()),
    defaultMeta: { service: name, version },
    transports: [new transports.Console()],
  });

  return logger;
};

export default initLogger;
