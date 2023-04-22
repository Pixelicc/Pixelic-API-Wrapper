const errors = require("../errors");
const utils = require("../utils");

module.exports = async function (player, timeframe, leaderboard) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (!["lifetime", "monthly", "weekly", "daily"].includes(timeframe.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD_TIMEFRAME);
  if (!["general", "bedwars", "skywars", "duels"].includes(leaderboard.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD);

  const res = await this.makeRequest(`https://api.pixelic.de/leaderboard/getpositions/${timeframe.toLowerCase()}/${leaderboard.toLowerCase()}/${player}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
