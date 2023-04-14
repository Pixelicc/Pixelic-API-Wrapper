const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

class Updater {
  checkForUpdates() {
    try {
      fetch("https://registry.npmjs.org/pixelic-api").then(async (packageInfo) => {
        const parsedPackageInfo = await packageInfo.json();
        const latestVersion = parsedPackageInfo["dist-tags"].latest;
        const currentVersion = require("../package.json").version;

        if (latestVersion !== currentVersion) {
          console.log(`[Pixelic-API-Wrapper] An update is available! Current version: ${currentVersion}, Latest version: ${latestVersion}`);
        }
      });
    } catch (error) {}
  }
}

module.exports = Updater;
