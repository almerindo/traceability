/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import {
  createLogger,
  format,
  Logger,
  LoggerOptions,
  transports,
} from 'winston';

import { TransformableInfo } from 'logform';
import ContextAsyncHooks from './ContextAsyncHooks';

export class LoggerTraceability {
  private static instance: LoggerTraceability;

  private logger: Logger;

  private constructor() {
    this.logger = createLogger(LoggerTraceability.getLoogerOptions());
  }

  public static getInstance(): LoggerTraceability {
    if (!LoggerTraceability.instance) {
      LoggerTraceability.instance = new LoggerTraceability();
    }
    return LoggerTraceability.instance;
  }

  public static configure(options: LoggerOptions): void {
    LoggerTraceability.getInstance().getLogger().configure(options);
  }

  public static getLoogerOptions(): LoggerOptions {
    const traceFormat = format((info: TransformableInfo) => {
      const requestInfo = ContextAsyncHooks.getContext();
      if (requestInfo && requestInfo[ContextAsyncHooks.trackKey]) {
        info[ContextAsyncHooks.trackKey] =
          requestInfo[ContextAsyncHooks.trackKey];
      }
      return info;
    });

    return {
      level: 'info',
      silent: false,
      format: format.combine(traceFormat(), format.timestamp(), format.json()),
      transports: [new transports.Console()],
    };
  }

  public getLogger(): Logger {
    return this.logger;
  }
}

export default LoggerTraceability.getInstance().getLogger();
