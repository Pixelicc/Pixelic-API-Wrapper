const errors = require("../errors");

/**
 * Retrieve all skyblock leaderboards (Skyblock only supports lifetime leaderboards).
 * @constructor
 * @param {number} limit - Choose how many players you want per leaderboard (allowed are 10, 100 and 1000).
 */
module.exports = async function (limit) {
  if (![1000, 100, 10].includes(limit)) return new Error(errors.INVALID_LEADERBOARD_LIMIT);

  const res = await this.makeRequest(`https://api.pixelic.de/leaderboard/skyblock/${limit}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
