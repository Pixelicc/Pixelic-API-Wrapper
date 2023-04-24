const errors = require("../errors");
const utils = require("../utils");

/**
 * Retrieve the price history of a specific bazaar item.
 * @constructor
 * @param {string} timeframe - The timeframe you want information about.
 * @param {string} product - The skyblock item's ID you want to look up.
 */
module.exports = async function (timeframe, product) {
  if (!["hour", "day", "week", "month", "year", "alltime"].includes(timeframe)) return new Error(errors.INVALID_HISTORY_TIMEFRAME);
  if (!utils.validateSkyblockID(product)) return new Error(errors.INVALID_SKYBLOCK_ITEM);

  const res = await this.makeRequest(`https://api.pixelic.de/bazaar/history/${timeframe}/${product}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 404) return new Error(errors.INVALID_BAZAAR_PRODUCT);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
