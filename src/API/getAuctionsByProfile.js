const errors = require("../errors");
const utils = require("../utils");

/**
 * Retrieve the most recent auctions by a skyblock profile (up to 100 **AND ONLY SELL DATA**).
 * @constructor
 * @param {string} profile - UUID of the profile you want to lookup.
 */
module.exports = async function (profile) {
  if (!utils.validateUUID(profile)) return new Error(errors.INVALID_PROFILE_UUID);

  const res = await this.makeRequest(`https://api.pixelic.de/auctionhouse/auctionsbyprofile/${profile}`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 422) return new Error(errors.INVALID_PROFILE_UUID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
