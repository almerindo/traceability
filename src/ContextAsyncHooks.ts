/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  [key: string]: string | string[] | undefined;
}

export enum ETrackKey {
  'X-Request-ID' = 'X-Request-ID',
  'X-Correlation-ID' = 'X-Correlation-ID',
  'trackId' = 'trackId',
}
export class ContextAsyncHooks {
  private static instance: ContextAsyncHooks;

  public asyncLocalStorage: AsyncLocalStorage<any>;

  public trackKey: ETrackKey = ETrackKey.trackId;

  private constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<any>();
  }

  public getExpressMiddlewareTracking(): any {
    return (request: Request, response: Response, next: NextFunction): void => {
      const context = this.getTrackId(request.headers);
      this.setContext(context);
      response.setHeader(this.trackKey, context[this.trackKey] as string);
      next();
    };
  }

  public setContext(data: RequestContext): void {
    let oldData = this.getContext();
    oldData = { ...oldData, ...data };
    this.asyncLocalStorage.enterWith(oldData);
  }

  public getTrackId(data: RequestContext): RequestContext {
    // eslint-disable-next-line prefer-object-spread
    const requestInfo = Object.assign({}, this.trackKey) as any;

    if (data && data[this.trackKey])
      requestInfo[this.trackKey] = data[this.trackKey];
    else {
      requestInfo[this.trackKey] = v4();
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
