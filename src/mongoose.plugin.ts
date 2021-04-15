/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */

import { Model, Schema } from 'mongoose';

import { MTraceability } from './examples/mongoose/model/traceability.interface';

// Logger.info('BO PLUG');
function traceability(
  schema: Schema<MTraceability>,
  ContextAsyncHooks: any,
): void {
  // console.info(`SCHEMA: `, schema);
  if (schema) {
    schema.post('save', function (docs: any) {
      console.info(ContextAsyncHooks.getContext());
    });
  }
}

export default traceability;
