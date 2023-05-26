const errors = require("../errors");

/**
 * Returns more in-depth stats about the Status of the Hypixel API.
 */
module.exports = async function () {
  const res = await this.makeRequest(`https://api.pixelic.de/status`, "GET", "NON-LIMITED");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  return new Error(errors.UNEXPECTED_ERROR);
};
