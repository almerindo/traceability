/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { MTraceability } from '../model/traceability.interface';
// import Traceability from '../../../index';

import plugin from '../../../mongoose.plugin';

// const { Logger, ContextAsyncHooks } = Traceability;

const TraceabilitySchema = new mongoose.Schema<MTraceability>(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },

    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      required: true,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { collection: 'Traceability', versionKey: false },
);

TraceabilitySchema.method('setContext', function (context) {
  this.context = context;
  // ContextAsyncHooks.setContext(context);
  console.info('PEGOU O CONTEXTO? ');
});
// TraceabilitySchema.method('cria', function (data) {
//   this.context = data;
//   this.create(data);
//   Logger.info('CRIOU? ');
// });
console.info('teest');
// TraceabilitySchema.plugin(plugin, Traceability.ContextAsyncHooks);
export default TraceabilitySchema;
