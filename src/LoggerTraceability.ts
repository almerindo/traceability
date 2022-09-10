/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { Logger } from 'winston';

import { TransformableInfo } from 'logform';
import {
  createLogger,
  format,
  ContextAsyncHooks,
  LoggerOptions,
  transports,
} from './index';

export class LoggerTraceability {
  private static instance: LoggerTraceability;

  private logger: Logger;

  private constructor() {
    this.logger = createLogger(LoggerTraceability.getLoggerOptions());
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

  public static getLoggerOptions(): LoggerOptions {
    const traceFormat = format((info: TransformableInfo) => {
      const requestInfo = ContextAsyncHooks.getContext();
      if (requestInfo && requestInfo.cid) {
        info.cid = requestInfo.cid;
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
