import winston from 'winston';
import ContextAsyncHooks, { ETrackKey } from './ContextAsyncHooks';
import Logger, { LoggerTraceability } from './LoggerTraceability';

export default {
  ...winston,
  ContextAsyncHooks,
  LoggerTraceability,
  Logger,
  ETrackKey,
};
