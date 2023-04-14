const utils = require("../utils");
const errors = require("../errors");

module.exports = async function (player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);

  const res = await this.makeRequest(`https://api.pixelic.de/player/skyblock/register/${player}`, "POST", "REGISTER");
  const parsedRes = await res.json();

  if (res.status === 201) return parsedRes;

  if (res.status === 400) return new Error(errors.ALREADY_IN_DATABASE);
  if (res.status === 422) return new Error(errors.INVALID_UUID_OR_USERNAME);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
