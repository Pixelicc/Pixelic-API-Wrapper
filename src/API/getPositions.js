const errors = require("../errors");
const utils = require("../utils");

/**
 * Returns all positions of a player in a mode for the specified timeframe.
 * @constructor
 * @param {string} timeframe - The timeframe you want information about (allowed are "lifetime", "monthly", "weekly" and "daily").
 * @param {string} mode - The mode you want information about (currently supported are General, Bedwars, Skywars and Duels).
 * @param {string} guild - ID of the guild you want to lookup.
 */
module.exports = async function (timeframe, mode, player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (!["lifetime", "monthly", "weekly", "daily"].includes(timeframe.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD_TIMEFRAME);
  if (!["general", "bedwars", "skywars", "duels"].includes(mode.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD);

  const res = await this.makeRequest(`https://api.pixelic.de/leaderboard/getpositions/${timeframe.toLowerCase()}/${mode.toLowerCase()}/${player}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
