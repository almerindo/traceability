/* eslint-disable @typescript-eslint/interface-name-prefix */
import mongoose from 'mongoose';

export interface ITraceability {
  name: string;
  status: string;

  created_at?: Date | null;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}
export interface MTraceability extends ITraceability, mongoose.Document {
  context: any;
  create(doc: any): any;
  setContext(context: any): void;
}
