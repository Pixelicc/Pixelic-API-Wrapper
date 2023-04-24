const errors = require("../errors");

/**
 * Returns all relevant information about your Pixelic-API-Key.
 */
module.exports = async function () {
  const res = await this.makeRequest(`https://api.pixelic.de/key`);
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
