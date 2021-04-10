/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import * as asyncHooks from 'async_hooks';
import { NextFunction, Request, Response } from 'express';

import { v4 } from 'uuid';

import fs from 'fs';
import util from 'util';

export interface RequestContext {
  [key: string]: string | string[] | undefined;
}

class ContextAsyncHooks {
  private store = new Map();

  private static instance: ContextAsyncHooks;

  private contextPropagationHook: asyncHooks.AsyncHook = asyncHooks.createHook({
    init: (asyncId: number, type: string, triggerAsyncId: number) => {
      if (this.store.has(triggerAsyncId)) {
        const data = this.store.get(triggerAsyncId);
        const tam = this.store.size;
        fs.writeFileSync(
          'init.out',
          `${util.format(
            'init asyncId',
            `asyncId : ${asyncId}`,
            `triggerAsyncId: ${triggerAsyncId}`,
            data,
            tam,
          )}\n`,
          { flag: 'a' },
        );
        this.store.set(asyncId, data);
      }
    },
    destroy: (asyncId: number) => {
      if (this.store.has(asyncId)) {
        const data = this.store.get(asyncId);
        const tam = this.store.size;

        fs.writeFileSync(
          'init.out',
          `${util.format(
            'delete asyncId',
            `asyncId : ${asyncId}`,
            data,
            tam,
          )}\n`,
          { flag: 'a' },
        );
        this.store.delete(asyncId);
      }
    },
  });

  private constructor() {
    this.contextPropagationHook.enable();
  }

  public getExpressMiddlewareTracking(): Function {
    return (request: Request, response: Response, next: NextFunction): void => {
      const { trackId } = this.getTrackId(request.headers);
      this.setContext({ trackId });
      response.setHeader('trackId', trackId as string);
      next();
    };
  }

  public setContext(data: RequestContext): void {
    let oldData = this.getContext();
    oldData = { ...oldData, ...data };
    this.store.set(asyncHooks.executionAsyncId(), oldData);
  }

  public getTrackId(data: RequestContext): RequestContext {
    let requestInfo;
    if (!data) {
      requestInfo = { trackId: v4() };
    } else {
      requestInfo = data.trackId
        ? { trackId: data.trackId }
        : { trackId: v4() };
    }

    return requestInfo;
  }

  public getContext(): RequestContext {
    return this.store.get(asyncHooks.executionAsyncId());
  }

  public static getInstance(): ContextAsyncHooks {
    if (!ContextAsyncHooks.instance) {
      ContextAsyncHooks.instance = new ContextAsyncHooks();
    }
    return ContextAsyncHooks.instance;
  }
}

export default ContextAsyncHooks.getInstance();
