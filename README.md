### Links

[Discord Support](https://discord.gg/ZpuscgCayg) | [NPM](https://www.npmjs.com/package/pixelic-api-wrapper) | [GitHub](https://github.com/Pixelicc/Pixelic-API-Wrapper)

### Install

```shell
npm i pixelic-api-wrapper
```

```js
const PixelicAPI = require("pixelic-api-wrapper");
```

### Quick Start

To be able to use the Pixelic-API via the Pixelic-API-Wrapper you still need to generate an API-Key.
Instructions on how to generate an API-Key can be found here : https://docs.pixelic.de

#### Step 1 of 2

```js
const pixelicAPI = new PixelicAPI("HERE-YOUR-KEY-GOES");
```

#### Step 2 of 2

#### ➤ Using promises?

```js
pixelicAPI
  .getDaily("Pixelic")
  .then((dailyData) => {
    /* process data */
  })
  .catch((error) => {
    /* handle error */
  });
```

#### ➤ Using async/await?

```js
try {
  const dailyData = await pixelicAPI.getDaily("Pixelic");
  /* process data */
} catch (error) {
  /* handle error */
}
```

### Docs

#### Constructor

```js
const pixelicAPI = new PixelicAPI("API-KEY", {
  /* options */
});
```

Basic options:

|        Option        | Default | Description                                                    |
| :------------------: | ------- | -------------------------------------------------------------- |
|      ratelimit       | 60      | Set how many "normal" Requests you want to send per Minute.    |
| leaderboardRatelimit | 10      | Set how many Leaderboard Requests you want to send per Minute. |
|  registerRatelimit   | 5       | Set how many Register Requests you want to send per 5-Minutes. |
|   checkForUpdates    | true    | Set whether to check for Updates on start.                     |
|      redis.host      | null    | Redis-Host (Used for Clustered-Ratelimiting)                   |
|      redis.port      | null    | Redis-Port (Used for Clustered-Ratelimiting)                   |
|    redis.username    | null    | Redis-Username (Used for Clustered-Ratelimting)                |
|    redis.password    | null    | Redis-Password (Used for Clustered-Ratelimiting)               |

#### Clustered-Ratelimiting with Redis

```js
const pixelicAPI = new PixelicAPI("API-KEY", {
  redis: {
    host: "10.0.0.10",
    port: 6379,
    username: "default",
    password: "",
  },
});
```
