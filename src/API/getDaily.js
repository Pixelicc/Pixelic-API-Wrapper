const utils = require("../utils");
const errors = require("../errors");

/**
 * Retrieve the daily stats of a specific player (Returns the total stats from the last check).
 * @constructor
 * @param {string} player - IGN or UUID of the player you want to lookup.
 */
module.exports = async function (player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);

  const res = await this.makeRequest(`https://api.pixelic.de/player/${player}/daily`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  if (res.status === 404) return new Error(errors.NOT_IN_DATABASE);
  if (res.status == 422) {
    return new Error(errors.INVALID_UUID_OR_USERNAME);
  }
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
