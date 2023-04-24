const errors = require("../errors");

/**
 * Returns all collected datapoints in the specified timeframe for the specified stat.
 * @constructor
 * @param {string} timeframe - The timeframe you want information about.
 * @param {string} stat - The stat you want more information about (allowed are "playersTracked", "playersTrackedSkyblock", " guildsTracked" or "auctionsStored").
 */
module.exports = async function (timeframe, stat) {
  if (!["hour", "day", "week", "month", "year", "alltime"].includes(timeframe)) return new Error(errors.INVALID_HISTORY_TIMEFRAME);
  if (!["playersTracked", "playersTrackedSkyblock", " guildsTracked", "auctionsStored"].includes(stat)) return new Error(errors.INVALID_HISTORY_STAT);

  const res = await this.makeRequest(`https://api.pixelic.de/stats/history/${timeframe}/${stat}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
