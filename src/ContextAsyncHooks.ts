/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';

import { v4 } from 'uuid';

import fs from 'fs';
import util from 'util';

import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  [key: string]: string | string[] | undefined;
}

class ContextAsyncHooks {
  private store = new Map();

  private idSeq = 0;

  private static instance: ContextAsyncHooks;

  asyncLocalStorage: any;

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<any>();
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
    this.asyncLocalStorage.enterWith(oldData);
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

  public getContext(): RequestContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  public static getInstance(): ContextAsyncHooks {
    if (!ContextAsyncHooks.instance) {
      ContextAsyncHooks.instance = new ContextAsyncHooks();
    }
    return ContextAsyncHooks.instance;
  }
}

export default ContextAsyncHooks.getInstance();
