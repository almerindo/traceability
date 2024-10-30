/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import { NextFunction, Request, Response } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { RandomIdGenerator } from './idGenerator';

export interface RequestContext {
  [key: string]: string | string[] | undefined;
}
class ContextAsyncHooksClass {
  private static instance: ContextAsyncHooksClass;

  public asyncLocalStorage: AsyncLocalStorage<any>;

  private constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage<any>();
  }

  public getExpressMiddlewareTracking(config?: {
    responseHeaderPropagator?: 'cid' | 'traceparent';
  }): any {
    return (request: Request, response: Response, next: NextFunction): void => {
      const { cid } = this.getTrackId(request.headers);
      this.setContext({ cid });
      if (!config || config.responseHeaderPropagator === 'cid') {
        response.setHeader('cid', cid as string);
        next();
      }
      if (config?.responseHeaderPropagator === 'traceparent') {
        const traceparent = this.buildTraceParent(cid as string);
        response.setHeader('traceparent', traceparent);
        next();
      }
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
    if (
      context &&
      context.traceparent &&
      typeof context.traceparent === 'string'
    ) {
      return { cid: this.getTraceIdFromTraceParent(context.traceparent) };
    }
    return { cid: RandomIdGenerator.generateTraceId() };
  }

  public getTraceParent(): string {
    const { cid } = this.getTrackId();
    return this.buildTraceParent(cid as string);
  }

  private getTraceIdFromTraceParent(traceParent: string): string {
    const traceId = traceParent.split('-')[1];

    return traceId;
  }

  private buildTraceParent(traceId: string): string {
    const spanId = RandomIdGenerator.generateSpanId();
    return `00-${traceId}-${spanId}-01`;
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
