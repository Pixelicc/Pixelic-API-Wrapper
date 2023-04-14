const errors = require("../errors");

module.exports = async function () {
  const res = await this.makeRequest(`https://api.pixelic.de/stats`);
  const parsedRes = await res.json();

  if (res.status === 200) return parsedRes;
  if (res.status === 429) return new Error(errors.RATELIMIT);

  return new Error(errors.UNEXPECTED_ERROR);
};
