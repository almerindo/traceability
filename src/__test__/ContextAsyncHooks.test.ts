/* eslint-disable no-console */

import { Logger, ContextAsyncHooks } from '../index';

describe('AsyncHooks Context', () => {
  ContextAsyncHooks.setContext({ trackId: '1234567890', parent: 'alm' });
  ContextAsyncHooks.setContext({
    userId: '1111111111',
  });
  it('Should get all payload on parent promisse context', () => {
    const data = ContextAsyncHooks.getContext();

    expect(data).toHaveProperty('trackId');
    if (data) {
      expect(data.trackId).toBe('1234567890');
      expect(data.parent).toBe('alm');
      expect(data.userId).toBe('1111111111');
    }
  });

  it('Should creates a context only assesible in this sub task', async () => {
    ContextAsyncHooks.setContext({
      parent: 'child',
    });
    const data = ContextAsyncHooks.getContext();

    expect(data).toHaveProperty('trackId');
    if (data) {
      expect(data.trackId).toBe('1234567890');
      expect(data.userId).toBe('1111111111');
      expect(data.parent).toBe('child');
    }
  });

  it('Should get all context, after the child context has been modified', () => {
    const data = ContextAsyncHooks.getContext();
    Logger.info('message', { data });
    if (data) {
      expect(data).toHaveProperty('trackId');
      expect(data.trackId).toBe('1234567890');
      expect(data.userId).toBe('1111111111');
      expect(data.parent).toBe('alm');
    }
  });
});
