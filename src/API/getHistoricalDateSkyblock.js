const utils = require("../utils");
const errors = require("../errors");

/**
 * Retrieve the stats of a specific skyblock player on the specified date (Returns the total stats from the last check).
 * @constructor
 * @param {string} date - Date you want to lookup (ISO-String formatted like "2023-01-01").
 * @param {string} player - IGN or UUID of the player you want to lookup.
 */
module.exports = async function (date, player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (!utils.validateISOString(timeframe.slice(timeframe.indexOf("/") + 1))) return new Error(errors.INVALID_ISOSTRING);

  const res = await this.makeRequest(`https://api.pixelic.de/player/skyblock/${player}/${date}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  if (res.status === 404) return new Error(errors.NOT_IN_DATABASE);
  if (res.status == 422) {
    if (parsedRes.cause == "Invalid UUID or Username") return new Error(errors.INVALID_UUID_OR_USERNAME);
    if (parsedRes.cause == "No Stats were found for the specified date") return new Error(errors.EMPTY_DATE);
    if (parsedRes.cause == "Arguments invalid") return new Error(errors.UNEXPECTED_ERROR);
  }
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
