const errors = require("../errors");
const utils = require("../utils");

/**
 * Query a specific past auction.
 * @constructor
 * @param {string} UUID - The UUID associated with that specific auction.
 */
module.exports = async function (UUID) {
  if (!utils.validateUUID(UUID)) return new Error(errors.INVALID_AUCTION_UUID);

  const res = await this.makeRequest(`https://api.pixelic.de/auctionhouse/auctionbyid/${UUID}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 422) return new Error(errors.INVALID_AUCTION_UUID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
