
[![TypeScript version][ts-badge]][typescript-38]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][LICENSE]
[![Build Status](https://cloud.drone.io/api/badges/almerindo/traceability/status.svg)](https://cloud.drone.io/almerindo/traceability)



# Install


> **NOTE** This lib needs to run on `version >= 14.0.0` of Nodejs

### Using Yarn
```
yarn install traceability
```
### Using npm
```
npm install traceability
```


# Example Code

## Logging the trackId in all method
> **File:** index.js
```js
import traceability from 'traceability'


const levelRoot = () =>{
  const {trackId} = traceability.ContextAsyncHooks.getTrackId({})
  traceability.ContextAsyncHooks.setContext({trackId})
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
{"message":"levelRoot","level":"info","trackId":"b6bc3db6-087f-4ff5-8888-26ed92e393ff","timestamp":"2021-04-10T18:18:07.623Z"}
{"message":"level1","level":"info","trackId":"b6bc3db6-087f-4ff5-8888-26ed92e393ff","timestamp":"2021-04-10T18:18:07.624Z"}
{"message":"level2","level":"info","trackId":"b6bc3db6-087f-4ff5-8888-26ed92e393ff","timestamp":"2021-04-10T18:18:07.624Z"}
```
> **NOTE:** We can observe the same trackId value for all output messages.


## Using as a Express middleware
> **File** express.js (see examples directory)
```js
import express from 'express';
import traceability from 'traceability';

const { ContextAsyncHooks, Logger } = traceability;

const app = express();
const port = 3000;
app.use(ContextAsyncHooks.getExpressMiddlewareTracking());
app.get('/', (req, res) => {
  Logger.info('Hello World with trackId on server side!');
  res.send('Hello World!');
});

app.listen(port, () => {
  Logger.info(`Example app listening at http://localhost:${port}`);
});
```

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
The output will look something like:

**On ClientSide:**
```
HTTP/1.1 200 OK
X-Powered-By: Express
trackId: 4732c74f-c49e-403e-84d1-3f7b1dc03ffc
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-Lve95gjOVATpfV8EL5X4nxwjKHE"
Date: Sat, 10 Apr 2021 19:20:23 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Hello World!%
```

**On ServerSide**:
```
{"message":"Hello World with trackId on server side!","level":"info","trackId":"4732c74f-c49e-403e-84d1-3f7b1dc03ffc","timestamp":"2021-04-10T19:20:23.641Z"}
```
---
> **NOTE:** At the momennt, we can compare the trackId values printed onn server side and on client side.
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

