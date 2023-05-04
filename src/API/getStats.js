const errors = require("../errors");

/**
 * Returns all relevant statistics about the Pixelic-API.
 */
module.exports = async function () {
  const res = await this.makeRequest(`https://api.pixelic.de/stats`, "GET", "NON-LIMITED");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  return new Error(errors.UNEXPECTED_ERROR);
};
