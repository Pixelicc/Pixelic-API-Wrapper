const utils = require("../utils");
const errors = require("../errors");

/**
 * Retrieve stats about a tracked guild including EXP, level, guildMaster, members, EXPHistory, scaledEXPHistory, monthlyRawEXP, monthlyScaledEXP and lifetime EXPPerGame.
 *
 * To get the current Monthly Raw GEXP take the monthlyRawEXP key and add the current Day's raw value to it. To get the current Monthly scaled GEXP take the monthlyScaledEXP key and add the current Day's raw value to it. You can retrieve the current Day's value by calling the Hypixel API. Daily and Weekly raw and scaled GEXP should be calculated directly with the Hypixel API Data.
 * @constructor
 * @param {string} guild - ID of the guild you want to lookup.
 */
module.exports = async function (guild) {
  if (!utils.validateGuildID(guild)) return new Error(errors.INVALID_GUILDID);

  const res = await this.makeRequest(`https://api.pixelic.de/guild/${guild}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  if (res.status === 404) return new Error(errors.GUILD_NOT_IN_DATABASE);
  if (res.status === 422) return new Error(errors.INVALID_GUILDID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
