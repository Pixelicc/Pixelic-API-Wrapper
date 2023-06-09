const errors = require("../errors");
const utils = require("../utils");

/**
 * Retrieve the most recent auctions by a player (up to 100).
 * @constructor
 * @param {string} player - IGN or UUID of the player you want to lookup.
 */
module.exports = async function (player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);

  const res = await this.makeRequest(`https://api.pixelic.de/auctionhouse/auctionsbyplayer/${player}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 422) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
