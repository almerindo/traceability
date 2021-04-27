/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { MTraceability } from '../model/traceability.interface';
import Traceability from '../../../index';

const { Logger, ContextAsyncHooks } = Traceability;

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

TraceabilitySchema.pre('save', function(next) {
  const context = ContextAsyncHooks.getContext();
  console.info({context})
  Logger.info('Has This log a trackId in PRE SAVE? ');
  next();
});

TraceabilitySchema.post('save', function(doc) {
  const context = ContextAsyncHooks.getContext();
  console.info({context})
  Logger.info('Has This log a trackId in POST SAVE? ');
});


export default TraceabilitySchema;
