import { ETrackKey } from '../ContextAsyncHooks';
import traceability from '../index';

export const level2 = (): void => {
  traceability.Logger.info('level2');
};

export const level1 = (): void => {
  traceability.Logger.info('level1');
  level2();
};

export const levelRoot = (): void => {
  traceability.ContextAsyncHooks.trackKey = ETrackKey['X-Correlation-ID'];
  const context = traceability.ContextAsyncHooks.getTrackId({});
  traceability.ContextAsyncHooks.setContext(context);
  traceability.Logger.info('levelRoot');
  level1();
};
