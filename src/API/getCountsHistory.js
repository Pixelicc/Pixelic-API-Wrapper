const errors = require("../errors");

module.exports = async function (timeframe) {
  if (!["hour", "day", "week", "month", "year", "alltime"].includes(timeframe)) return new Error(errors.INVALID_HISTORY_TIMEFRAME);

  const res = await this.makeRequest(`https://api.pixelic.de/counts/history/${timeframe}`);
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
