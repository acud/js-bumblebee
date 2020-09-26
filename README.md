[![TypeScript version][ts-badge]][typescript-39]
[![Node.js version][nodejs-badge]][nodejs]
[![BSD][license-badge]][LICENSE]


# Bumblebee

Bumblebee is a native javascript proxy that uses [bee](https://github.com/ethersphere/bee) as the underlying client to the Swarm. The main motivation behind this project is to provide an entry point for an improved developer experience, harnessing the strength of the javascript ecosystem, to create a native javascript implementation of Swarm.

## Setup

```
git clone git@github.com:ethersphere/js-bumblebee && cd js-bumblebee
npm i
```

## Usage

Bumblebee currently proxies the existing `bee` project, using only the chunk api to interact with the network.
So currently, in order to start bumblebee, you're going to need to run a bee node too. This is until a native libp2p implementation is avail to inject into bumblebee in order to do individual chunk operations over the network.

About running a bee node, visit the official [repo](https://github.com/ethersphere/bee).
Once that's done, run your bumblebee using the the `bee` api as a backend:
```
npm run build
node ./build/src/main.js
```

Bumblebee will try by default to connect to your bee node at `localhost:8080`. You can specify a different bee listener with:
```
node ./build/src/main.js --bee-endpoint "localhost:6060"
```

Have a look at `./src/config/config.ts` for possible CLI flags. This is a moving target and as of such not documented here at this moment.

## Architecture

Bumblebee aims to be the cornerstore of the javascript implementation of Swarm. As of such, it envisions maintaining purity of interfaces between backend `bee` and the javascript proxy, this is to enable future integration with a native libp2p implementation of the Swarm protocols.

At this present moment, the proposed architecture could be described with the following diagram:
```
BUMBLEBEE PHASE 1


+-------------------------------------------------------------------------------------------+
|                                                                                           |
|    +------------+   +------------+  +-------------+  +-------------+   +---------------+  |
|    |            |   |            |  |             |  |             |   |               |  |
|    |   CRYPTO   |   |   SIGNER   |  |     SOC     |  |    FILE     |   |      PSS      |  |
|    |            |   |            |  |             |  |             |   |               |  |
|    +------------+   +------------+  +-------------+  +-------------+   +---------------+  |
|                                                                                           |
|    +----------------------------------------------------------------------------------+   |
|    |                   INTEROP WRAPPER / CHUNK ONLY OPERATIONS                        |   |
|    +----------------------------------------------------------------------------------+   |
|                                                                                           |
|    +----------------------------------------------------------------------------------+   |
|    |                                                                                  |   |
|    |                              BACKEND BEE CLIENT                                  |   |
|    |                                                                                  |   |
|    +----------------------------------------------------------------------------------+   |
|                                                                                           |
|    +----------------------------------------------------------------------------------+   |
|    |                                                                                  |   |
|    |                                    NETWORK                                       |   |
|    |                                                                                  |   |
|    +----------------------------------------------------------------------------------+   |
|                                                                                           |
+-------------------------------------------------------------------------------------------+
```

The bumblebee client is obliged not to deviate from the chunk-only interop layer (provided by the `Client` interface). The model should be revisited should any deviations arise. The client should be able to implement all higher-level functionalities using the chunk interface _only_.

Further working assumptions:
- No persistent storage
- No in-memory caching
- No notion of p2p protocols
- Browser compatible, complemented by a CI flow that makes sure this property is preserved
- Components should be lean and ideally should be pulled out to separate repos as soon as possible

## Contributing

Kindly read the styleguide [here](https://github.com/basarat/typescript-book/blob/master/docs/styleguide/styleguide.md) before PRing anything into the repo.

### Etymology

 This project is meant to harness higher-level abstractions and implementations over the lean `bee` client, hence the name Bumblebee, or in other words - an oversized bee :)


[ts-badge]: https://img.shields.io/badge/TypeScript-3.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-39]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html
[license-badge]: https://img.shields.io/badge/license-BSD-blue.svg
[license]: https://github.com/acud/js-bumblebee/blob/master/LICENSE

[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
