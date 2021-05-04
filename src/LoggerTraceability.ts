/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { createLogger, format, Logger, transports } from 'winston';

import { TransformableInfo } from 'logform';
import dotenv from 'dotenv';
import ContextAsyncHooks from './ContextAsyncHooks';

dotenv.config();

class LoggerTraceability {
  private static instance: LoggerTraceability;

  private logger: Logger;

  private LEVEL = 'info';

  private SILENT = false;

  private traceFormat = format((info: TransformableInfo) => {
    const requestInfo = ContextAsyncHooks.getContext();
    if (requestInfo && requestInfo[ContextAsyncHooks.trackKey]) {
      info[ContextAsyncHooks.trackKey] =
        requestInfo[ContextAsyncHooks.trackKey];
    }
    return info;
  });

  private constructor() {
    const { serviceName, version } = process.env;
    this.logger = createLogger({
      level: this.LEVEL,
      silent: this.SILENT,
      format: format.combine(
        this.traceFormat(),
        format.timestamp(),
        format.json(),
      ),
      defaultMeta: { service: serviceName, version },
      transports: [new transports.Console()],
    });
  }

  public static getInstance(): LoggerTraceability {
    if (!LoggerTraceability.instance) {
      LoggerTraceability.instance = new LoggerTraceability();
    }
    return LoggerTraceability.instance;
  }

  public getLogger(): Logger {
    return this.logger;
  }
}

export default LoggerTraceability.getInstance().getLogger();
