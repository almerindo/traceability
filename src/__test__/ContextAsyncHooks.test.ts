/* eslint-disable no-console */

import ContextAsyncHooks from '../ContextAsyncHooks';

describe('AsyncHooks Context', () => {
  ContextAsyncHooks.setContext({ trackId: '1234567890', teste: 'alm' });

  it('Should get trackId on context', () => {
    const data = ContextAsyncHooks.getContext();
    ContextAsyncHooks.setContext({
      userId: '1111111111',
    });

    expect(data).toHaveProperty('trackId');
    expect(data.trackId).toBe('1234567890');
  });

  it('Should set data on context and return data + trackId', async () => {
    const data = ContextAsyncHooks.getContext();

    expect(data).toHaveProperty('trackId');
    expect(data.trackId).toBe('1234567890');
    expect(data.userId).toBe('1111111111');
    expect(data.teste).toBe('alm');
  });

  it('Should log trackId', async () => {
    const data = ContextAsyncHooks.getContext();

    expect(data).toHaveProperty('trackId');
    expect(data.trackId).toBe('1234567890');
    expect(data.userId).toBe('1111111111');
    expect(data.teste).toBe('alm');
  });
});
