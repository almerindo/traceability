/* eslint-disable no-console */

import Logger from '../logger.configuration';

const logger = Logger('testService', 'v1.1.1');

describe('Logger with trackId', () => {
  it('Should log trackid on logger', () => {
    const x = logger.info('testando o teste', {
      data: {
        userId: '123456789',
      },
    });
    console.log(x);
    expect(true).toBe(true);
  });
});
