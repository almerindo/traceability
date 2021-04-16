import { TraceabilityModel } from './model/traceability.model';
import traceability from '../../index';
import { ITraceability } from './model/traceability.interface';

const user: Partial<ITraceability> = {
  name: 'Steve Jobs',
  status: 'teste',
};

const Main = async (): Promise<void> => {
  traceability.ContextAsyncHooks.setContext({});
  const { trackId } = traceability.ContextAsyncHooks.getTrackId(
    traceability.ContextAsyncHooks.getContext(),
  );
  traceability.ContextAsyncHooks.setContext({ trackId });

  traceability.Logger.info('BEGIN OF ALL');
  (TraceabilityModel as any).setContext(
    traceability.ContextAsyncHooks.getContext(),
  );

  await TraceabilityModel.create(user);

  // const doc = await TraceabilityModel.findOne({});
  // await doc?.save();
  traceability.Logger.info('END OF ALL');
};

Main();
