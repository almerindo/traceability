/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { createLogger, format, Logger, transports } from 'winston';

import { TransformableInfo } from 'logform';
import ContextAsyncHooks from './ContextAsyncHooks';

class LoggerTraceability {
  private static instance: LoggerTraceability;

  private logger: Logger;

  public static level = 'info';

  public static silent = false;

  private traceFormat = format((info: TransformableInfo) => {
    const requestInfo = ContextAsyncHooks.getContext();
    if (requestInfo && requestInfo.trackId) {
      info.trackId = requestInfo.trackId;
    }
    return info;
  });

  private constructor() {
    const { serviceName, version } = process.env;
    this.logger = createLogger({
      level: LoggerTraceability.level,
      silent: LoggerTraceability.silent,
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
