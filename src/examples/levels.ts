import { Logger, ContextAsyncHooks, LoggerTraceability } from '../index';

export const loggerConfiguration = LoggerTraceability.getLoggerOptions();
LoggerTraceability.configure(loggerConfiguration);

export const level2 = (): void => {
  Logger.error('level2');
};

export const level1 = (): void => {
  Logger.warn('level1');
  level2();
};

export const levelRoot = (): void => {
  const context = ContextAsyncHooks.getTrackId({});
  ContextAsyncHooks.setContext(context);
  Logger.info('levelRoot');
  level1();
};
