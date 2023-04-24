const errors = require("../errors");
const utils = require("../utils");

/**
 * Returns all positions of a guild on leaderboards in the specified timeframe.
 * @constructor
 * @param {string} timeframe - The timeframe you want information about (allowed are "lifetime", "monthly", "weekly" and "daily").
 * @param {string} guild - ID of the guild you want to lookup.
 */
module.exports = async function (timeframe, guild) {
  if (!utils.validateGuildID(guild)) return new Error(errors.INVALID_GUILDID);
  if (!["lifetime", "monthly", "weekly", "daily"].includes(timeframe.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD_TIMEFRAME);

  const res = await this.makeRequest(`https://api.pixelic.de/guild-leaderboard/getpositions/${timeframe.toLowerCase()}/${guild}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
