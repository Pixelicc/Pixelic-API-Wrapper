const errors = require("../errors");

module.exports = async function (timeframe, limit) {
  if (!["lifetime", "monthly", "weekly", "daily"].includes(timeframe)) return new Error(errors.INVALID_LEADERBOARD_TIMEFRAME);
  if (![1000, 100, 10].includes(limit)) return new Error(errors.INVALID_LEADERBOARD_LIMIT);

  const res = await this.makeRequest(`https://api.pixelic.de/guild-leaderboard/${timeframe.toLowerCase()}/${limit}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
