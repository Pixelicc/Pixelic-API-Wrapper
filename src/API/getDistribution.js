const errors = require("../errors");

/**
 * Retrieve distribution counts of ranks, plusColors, plusPlusColors, languages or chatChannels.
 * @constructor
 * @param {string} distribution - The distribution you want to look up (supported are ranks, plusColor, plusPlusColor, language or chatChannel)
 */
module.exports = async function (distribution) {
  if (!["ranks", "plusColor", "plusPlusColor", "language", "chatChannel"].includes(distribution)) return new Error(errors.INVALID_DISTRIBUTION);

  const res = await this.makeRequest(`https://api.pixelic.de/distribution/${distribution}`, "GET", "NON-LIMITED");
  const parsedRes = await res.json();

  if (res.status === 200 || res.status === 304) return parsedRes;

  return new Error(errors.UNEXPECTED_ERROR);
};
