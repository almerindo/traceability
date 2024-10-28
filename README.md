<a href="https://www.buymeacoffee.com/almerindo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

[![TypeScript version][ts-badge]][typescript-38]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![Build Status](https://cloud.drone.io/api/badges/almerindo/traceability/status.svg)](https://cloud.drone.io/almerindo/traceability)



# Install

> **NOTE** This lib needs to run on `version >= 14.0.0` of Nodejs
> After the veersion 1.7 there is a BREAKING CHANGE!
### Using Yarn
```
yarn install traceability
```
### Using npm
```
npm install traceability
```


# Example Code

## Logging the trackId in all methods
> **File:** index.js
```js
import * as traceability from 'traceability'


const levelRoot = () =>{
  const {cid} = traceability.ContextAsyncHooks.getTrackId({})
  traceability.ContextAsyncHooks.setContext({cid})
  traceability.Logger.info('levelRoot');
  level1()

}
const level1 =  () =>{
  traceability.Logger.info('level1');
  level2();
}

const level2 =  () =>{
  traceability.Logger.info('level2');
}

levelRoot();
```
### Output
```
{"message":"levelRoot","level":"info","cid":"6b1552d0-0db5-4d7d-8551-567847703fa6","timestamp":"2021-05-03T16:21:01.523Z"}
{"message":"level1","level":"info","cid":"6b1552d0-0db5-4d7d-8551-567847703fa6","timestamp":"2021-05-03T16:21:01.525Z"}
{"message":"level2","level":"info","cid":"6b1552d0-0db5-4d7d-8551-567847703fa6","timestamp":"2021-05-03T16:21:01.525Z"}
```
> **NOTE:** We can observe the same trackId value for all output messages.

## Changing the wiston configuration
```js
import { ContextAsyncHooks, Logger, LoggerTraceability } from 'traceability';


const conf = LoggerTraceability.getLoggerOptions();
conf.silent = true;

LoggerTraceability.configure(conf);

Logger.info('levelRoot');
```

## Using as a Express middleware
> **File** express.js (see examples directory)
```js
import express from 'express';
import { ContextAsyncHooks, Logger } from 'traceability';


const app = express();
const port = 3000;

ContextAsyncHooks.trackKey= ETrackKey['cid']

app.use(ContextAsyncHooks.getExpressMiddlewareTracking());
app.get('/', (req, res) => {
  Logger.info('Hello World with trackId on server side!');
  res.send('Hello World!');
});

app.listen(port, () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
});
```


## Using as a Express middleware with traceparent propagator
> **File** express-traceparent.ts (see examples directory)
```js
import express from 'express';
import { ContextAsyncHooks, Logger } from 'traceability';


const app = express();
const port = 3000;

ContextAsyncHooks.trackKey= ETrackKey['cid']

app.use(ContextAsyncHooks.getExpressMiddlewareTracking({
  responseHeaderPropagator: 'traceparent'
}));
app.get('/', (req, res) => {
  Logger.info('Hello World with trackId on server side!');
  res.send('Hello World!');
});

app.listen(port, () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
});
```
> When traceparent is enabled, the library will automatically generate and propagate the traceparent header in all outgoing requests, following the W3C Trace Context format:
`traceparent: 00-<trace-id>-<span-id>-<trace-flags>`

### Running the code:
```
yarn ts-node ./express.ts
```
And after that we will see the following output:
```
{"message":"Example app listening at http://localhost:3000","level":"info","timestamp":"2021-04-10T19:01:33.337Z"}
```
### Testing the route GET /
We will test the route usig curl cli.
> To install curl on linux: `sudo apt-get install curl`

Now type the following command:
```
curl -i http://localhost:3000
```
> -i option will show you the header.
---
The `output` will look something like:

**On ClientSide:**
```
HTTP/1.1 200 OK
X-Powered-By: Express
cid: 79a0e7f2-3e02-49aa-9368-582b9cce6002
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Mon, 03 May 2021 17:00:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello World!%
```

**On ServerSide**:
```
{"message":"Hello World with trackId on server side!","level":"info","cid":"6ecf583a-7509-4ce3-baef-1fcbe94adc5c","timestamp":"2021-05-03T16:57:32.116Z"}
```
---
> **NOTE:** At the momennt, we can compare the cid values printed onn server side and on client side.

## Using as a Nest middleware - Global Middleware

First of all, follow the First Steps accessing the link [NESTJS Oficial Docs](https://docs.nestjs.com/first-steps). After that, just modify the `main.ts` file as described bellow.

> **File** main.ts (see examples directory)
```js
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import traceability from 'traceability';

const middlewareTracking = traceability.ContextAsyncHooks.getExpressMiddlewareTracking();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(middlewareTracking);
  await app.listen(3000);
}
bootstrap();
```

## Using methods from winston

Just destructure the necessary methods directly from traceability

```js
import {format, addColors} from 'traceability';

```

``format`` and ``addColors`` comes from winston

# Known issues

 ## TypeError: async_hooks_1.AsyncLocalStorage is not a constructor:
 ```
 this.asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();

 TypeError: async_hooks_1.AsyncLocalStorage is not a constructor
    at new ContextAsyncHooks

```
> This lib uses LocalStorageAsyncHooks as a feature that is only available on Node >= 14.0.0
>
> Then, to solve it,  you must migrates your node to 14.0.0. Type: nvm use 14.16.1


## License
 See the [LICENSE](https://raw.githubusercontent.com/almerindo/traceability/main/LICENSE) file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-3.8-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js-%3E=%2014.16-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-38]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://raw.githubusercontent.com/almerindo/traceability/main/LICENSE



[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/...
[prettier]: https://prettier.io

