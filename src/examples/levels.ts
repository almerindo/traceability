import traceability from '../index';

export const level2 = (): void => {
  traceability.Logger.info('level2');
};

export const level1 = (): void => {
  traceability.Logger.info('level1');
  level2();
};

export const levelRoot = (): void => {
  const { trackId } = traceability.ContextAsyncHooks.getTrackId({});
  traceability.ContextAsyncHooks.setContext({ trackId });
  traceability.Logger.info('levelRoot');
  level1();
};
