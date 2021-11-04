import { Logger, LoggerTraceability } from '../index';

describe('LoggerTraceability', () => {
  it('Should update a LoggerOptions', () => {
    expect(Logger.level).toBe('info');
    expect(Logger.silent).toBeFalsy();

    const conf = LoggerTraceability.getLoggerOptions();
    conf.level = 'error';
    conf.silent = true;

    LoggerTraceability.configure(conf);

    expect(Logger.level).toBe('error');
    expect(Logger.silent).toBeTruthy();
  });
});
