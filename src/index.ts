import {
  addColors,
  format,
  Logform,
  config,
  transports,
  transport,
  ExceptionHandler,
  QueryOptions,
  Profiler,
  LogEntry,
  LogMethod,
  LeveledLogMethod,
  LoggerOptions,
  Container,
  error,
  warn,
  info,
  http,
  verbose,
  debug,
  silly,
  createLogger,
} from 'winston';
import { LoggerTraceability } from './LoggerTraceability';

export * from './ContextAsyncHooks';
export * from './LoggerTraceability';
export const Logger = LoggerTraceability.getInstance().getLogger();

export {
  createLogger,
  addColors,
  format,
  QueryOptions,
  Logform,
  config,
  transports,
  transport,
  ExceptionHandler,
  Profiler,
  LogEntry,
  LogMethod,
  LeveledLogMethod,
  LoggerOptions,
  Container,
  error,
  warn,
  info,
  http,
  verbose,
  debug,
  silly,
};
