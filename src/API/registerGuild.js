const utils = require("../utils");
const errors = require("../errors");

/**
 * Register a guild to the Pixelic-API's tracking.
 * @constructor
 * @param {string} guild - ID of the guild you want to register.
 */
module.exports = async function (guild) {
  if (!utils.validateGuildID(guild)) return new Error(errors.INVALID_GUILDID);

  const res = await this.makeRequest(`https://api.pixelic.de/guild/register/${guild}`, "POST", "REGISTER");
  const parsedRes = await res.json();

  if (res.status === 201) return parsedRes;

  if (res.status === 400) return new Error(errors.ALREADY_IN_DATABASE);
  if (res.status === 422) return new Error(errors.INVALID_GUILDID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
