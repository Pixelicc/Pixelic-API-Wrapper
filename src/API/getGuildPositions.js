const errors = require("../errors");
const utils = require("../utils");

module.exports = async function (guild, timeframe) {
  if (!utils.validateGuildID(guild)) return new Error(errors.INVALID_GUILDID);
  if (!["lifetime", "monthly", "weekly", "daily"].includes(timeframe.toLowerCase())) return new Error(errors.INVALID_LEADERBOARD_TIMEFRAME);

  const res = await this.makeRequest(`https://api.pixelic.de/guild-leaderboard/getpositions/${timeframe.toLowerCase()}/${guild}`, "GET", "LEADERBOARD");
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
