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
class ContextAsyncHooksClass {
  private static instance: ContextAsyncHooksClass;

  public asyncLocalStorage: AsyncLocalStorage<any>;

  private constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<any>();
  }

  public getExpressMiddlewareTracking(): any {
    return (request: Request, response: Response, next: NextFunction): void => {
      const { cid } = this.getTrackId(request.headers);
      this.setContext({ cid });
      response.setHeader('cid', cid as string);
      next();
    };
  }

  public setContext(data: RequestContext): void {
    let oldData = this.getContext();
    oldData = { ...oldData, ...data };
    this.asyncLocalStorage.enterWith(oldData);
  }

  public getTrackId(contextParam?: RequestContext): RequestContext {
    const context = contextParam || this.getContext();

    if (context && context.cid) {
      return { cid: context.cid };
    }
    return { cid: v4() };
  }

  public getContext(): RequestContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  public static getInstance(): ContextAsyncHooksClass {
    if (!ContextAsyncHooksClass.instance) {
      ContextAsyncHooksClass.instance = new ContextAsyncHooksClass();
    }
    return ContextAsyncHooksClass.instance;
  }
}

export const ContextAsyncHooks = ContextAsyncHooksClass.getInstance();
