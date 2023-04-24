const errors = require("../errors");
const utils = require("../utils");

/**
 * Retrieve the current price of an auctionhouse item.
 * @constructor
 * @param {string} item - The skyblock item's ID you want to look up.
 */
module.exports = async function (item) {
  if (!utils.validateSkyblockID(item)) return new Error(errors.INVALID_SKYBLOCK_ITEM);

  const res = await this.makeRequest(`https://api.pixelic.de/auctionhouse/current/${item}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 404) return new Error(errors.INVALID_AH_ITEM);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
