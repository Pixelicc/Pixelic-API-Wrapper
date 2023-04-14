const errors = require("../errors");
const utils = require("../utils");

module.exports = async function (timeframe, item) {
  if (!["day", "week", "month", "year", "alltime"].includes(timeframe)) return new Error(errors.INVALID_AH_HISTORY_TIMEFRAME);
  if (!utils.validateSkyblockID(item)) return new Error(errors.INVALID_SKYBLOCK_ITEM);

  const res = await this.makeRequest(`https://api.pixelic.de/auctionhouse/history/${timeframe}/${item}`);
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;
  if (res.status === 404) return new Error(errors.INVALID_AH_ITEM);
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
