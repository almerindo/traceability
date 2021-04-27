import { TraceabilityModel } from './model/traceability.model';
import traceability from '../../index';
import { ITraceability } from './model/traceability.interface';

const {ContextAsyncHooks, Logger} =  traceability;

const user: Partial<ITraceability> = {
  name: 'Steve Jobs',
  status: 'teste',
};

const Main = async (): Promise<void> => {
  
  ContextAsyncHooks.setContext({});
  
  const { trackId } = ContextAsyncHooks.getTrackId(
    ContextAsyncHooks.getContext(),
  );
  ContextAsyncHooks.setContext({ trackId });

  Logger.info('BEGIN OF ALL');

  await TraceabilityModel.create(user);

  // const doc = await TraceabilityModel.findOne({});
  // await doc?.save();
  Logger.info('END OF ALL');
};

Main();
