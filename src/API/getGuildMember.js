const utils = require("../utils");
const errors = require("../errors");

/**
 * Retrieve stats about a guild member tracked including the corresponding guildID, alltimeQuestParticipation, EXPHistory and monthlyEXP.
 *
 * To get the current Monthly GEXP take the monthlyEXP key and add the current Day's value to it. You can retrieve the current Day's value by calling the Hypixel API. Daily and Weekly GEXP should be calculated directly with the Hypixel API Data.
 * @constructor
 * @param {string} player - IGN or UUID of the player you want to lookup.
 */
module.exports = async function (player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);

  const res = await this.makeRequest(`https://api.pixelic.de/guild/member/${player}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  if (res.status === 404) return new Error(errors.GUILD_MEMBER_NOT_IN_DATABASE);
  if (res.status === 422) return new Error(errors.INVALID_GUILDID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
