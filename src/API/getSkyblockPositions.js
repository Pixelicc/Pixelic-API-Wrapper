const errors = require("../errors");
const utils = require("../utils");

module.exports = async function (player, profile) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (!utils.validateUUID(profile)) return new Error(errors.INVALID_PROFILE_UUID);

  const res = await this.makeRequest(`https://api.pixelic.de/leaderboard/skyblock/getpositions/${player}/${profile}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
