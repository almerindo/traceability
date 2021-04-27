/* eslint-disable import/prefer-default-export */
// import mongoose from 'mongoose';
import { MTraceability } from './traceability.interface';
import TraceabilitySchema from '../schema/traceability.schema';
import database from '../database/DatabaseConnectionPool';

const dbPool = database.getInstance();

export const TraceabilityModel = dbPool
  .getConnection('test')
  ?.model<MTraceability>('Traceability', TraceabilitySchema);

