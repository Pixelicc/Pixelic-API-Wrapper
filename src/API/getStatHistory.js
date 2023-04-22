const errors = require("../errors");

module.exports = async function (timeframe, stat) {
  if (!["hour", "day", "week", "month", "year", "alltime"].includes(timeframe)) return new Error(errors.INVALID_HISTORY_TIMEFRAME);
  if (!["playersTracked", "playersTrackedSkyblock", " guildsTracked", "auctionsStored"].includes(stat)) return new Error(errors.INVALID_HISTORY_STAT);

  const res = await this.makeRequest(`https://api.pixelic.de/stats/history/${timeframe}/${stat}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
