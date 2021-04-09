import * as asyncHooks from 'async_hooks';
import { Application, NextFunction, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { v4 } from 'uuid';

const store = new Map();

const contextPropagationHook: asyncHooks.AsyncHook = asyncHooks.createHook({
  init: (asyncId: number, type: string, triggerAsyncId: number) => {
    if (store.has(triggerAsyncId)) {
      store.set(asyncId, store.get(triggerAsyncId));
    }
  },
  destroy: (asyncId: number) => {
    if (store.has(asyncId)) {
      store.delete(asyncId);
    }
  },
});

contextPropagationHook.enable();

export interface RequestContext {
  trackId: string | string[];
}

export const createRequestContext = (
  headers: IncomingHttpHeaders,
): RequestContext => {
  const requestInfo = headers.trackId
    ? { trackId: headers.trackId }
    : { trackId: v4() };

  store.set(asyncHooks.executionAsyncId(), requestInfo);

  return requestInfo;
};

export const getRequestContext = (): RequestContext =>
  store.get(asyncHooks.executionAsyncId());

export const tracingCustomizer = (app: Application): void => {
  app.use((request: Request, response: Response, next: NextFunction) => {
    const context = createRequestContext(request.headers);
    response.setHeader('trackId', context.trackId);
    next();
  });
};
