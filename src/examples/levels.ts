import { Logger, ContextAsyncHooks, LoggerTraceability } from '../index';

export const loggerConfiguration = LoggerTraceability.getLoggerOptions();
LoggerTraceability.configure(loggerConfiguration);

export const level2 = (): void => {
  Logger.info('level2');
};

export const level1 = (): void => {
  Logger.info('level1');
  level2();
};

export const levelRoot = (): void => {
  // ContextAsyncHooks.trackKey = ETrackKey['X-Correlation-ID'];
  const context = ContextAsyncHooks.getTrackId({});
  ContextAsyncHooks.setContext(context);
  Logger.info('levelRoot');
  level1();
};
