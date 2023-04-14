const utils = require("../utils");
const errors = require("../errors");

module.exports = async function (player) {
  if (!utils.validateUUID(player) && !utils.validateUsername(player)) return new Error(errors.INVALID_UUID_OR_USERNAME);

  const res = await this.makeRequest(`https://api.pixelic.de/guild/member/${player}`);
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;

  if (res.status === 404) return new Error(errors.GUILD_MEMBER_NOT_IN_DATABASE);
  if (res.status === 422) return new Error(errors.INVALID_GUILDID);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
