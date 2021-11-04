import { ETrackKey } from '../ContextAsyncHooks';
import { Logger, ContextAsyncHooks } from '../index';

export const level2 = (): void => {
  Logger.info('level2');
};

export const level1 = (): void => {
  Logger.info('level1');
  level2();
};

export const levelRoot = (): void => {
  ContextAsyncHooks.trackKey = ETrackKey['X-Correlation-ID'];
  const context = ContextAsyncHooks.getTrackId({});
  ContextAsyncHooks.setContext(context);
  Logger.info('levelRoot');
  level1();
};
