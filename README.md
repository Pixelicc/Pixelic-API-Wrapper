### Links

[Discord Support](https://discord.gg/ZpuscgCayg) | [NPM](https://www.npmjs.com/package/pixelic-api) | [GitHub](https://github.com/Pixelicc/Pixelic-API-Wrapper)

### Installation & Usage

```shell
npm i pixelic-api
```

```js
const PixelicAPI = require("pixelic-api");
const pixelicAPI = new PixelicAPI("PIXELIC-API-KEY");
// Instructions on how to get an API-Key -> https://docs.pixelic.de

// getDaily
pixelicAPI
  .getDaily("Pixelic")
  .then((daily) => {
    console.log(daily.General.level);
  })
  .catch((error) => {
    console.error(error);
  });

// getDailySkyblock
pixelicAPI
  .getDailySkyblock("Pixelic")
  .then((daily) => {
    console.log(daily.Profiles);
  })
  .catch((error) => {
    console.error(error);
  });
```
