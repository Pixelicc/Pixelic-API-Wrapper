const errors = require("./errors");

module.exports = {
  validateKey: (key) => {
    if (/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{19}/.test(key)) return key;
    return new Error(errors.INVALID_PIXELIC_API_KEY);
  },
  validateUUID: (UUID) => /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}|[0-9a-f]{12}4[0-9a-f]{19}/.test(UUID),
  validateUsername: (Username) => /^[a-zA-Z0-9_]{2,16}$/.test(Username),
  validateISOString: (DATE) => /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(DATE),
  validateGuildID: (guildID) => /^[0-9a-fA-F]{24}$/.test(guildID),
  validateSkyblockID: (SKYBLOCK_ID) => /^[A-Z\d\_:]+$/.test(SKYBLOCK_ID),
  parseOptions: (options) => {
    if (typeof options !== "object" || options === null) throw new Error(errors.OPTIONS_MUST_BE_AN_OBJECT);
    return {
      ratelimit: options?.ratelimit || 60,
      leaderboardRateLimit: options?.leaderboardRateLimit || 10,
      registerRateLimit: options?.registerRateLimit || 5,
      checkForUpdates: options?.checkForUpdates || true,
      redis: {
        host: options?.redis?.host,
        port: options?.redis?.port,
        username: options?.redis?.username,
        password: options?.redis?.password,
      },
    };
  },
  validateOptions: (options) => {
    if (typeof options.ratelimit !== "number") throw new Error(errors.RATELIMIT_MUST_BE_A_NUMBER);
    if (typeof options.leaderboardRateLimit !== "number") throw new Error(errors.RATELIMIT_MUST_BE_A_NUMBER);
    if (typeof options.registerRateLimit !== "number") throw new Error(errors.RATELIMIT_MUST_BE_A_NUMBER);
    if (typeof options.checkForUpdates !== "boolean") throw new Error(errors.CHECK_FOR_UPDATES_MUST_BE_A_BOOLEAN);
    if (options.redis.host !== undefined) {
      if (typeof options.redis.host !== "string") throw new Error(errors.REDIS_HOST_MUST_BE_A_STRING);
      if (typeof options.redis.port !== "number") throw new Error(errors.REDIS_PORT_MUST_BE_A_NUMBER);
      if (typeof options.redis.username !== "string") throw new Error(errors.REDIS_USERNAME_MUST_A_BE_STRING);
      if (typeof options.redis.password !== "string") throw new Error(errors.REDIS_PASSWORD_MUST_A_BE_STRING);
    }
  },
};
