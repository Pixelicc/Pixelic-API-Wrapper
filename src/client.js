const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const Bottleneck = require("bottleneck");
const API = require("./API/index");
const utils = require("./utils");
const errors = require("./errors");
/**
 * Client class
 */
class Client {
  /**
   * @param {string} key API-Key [(?)](https://docs.pixelic.de)
   * @param {ClientOptions} [options={}] Client options
   */
  constructor(key, options = {}) {
    this.key = utils.validateKey(key);
    this.options = utils.parseOptions(options);
    utils.validateOptions(this.options);

    this.limiter = new Bottleneck({
      minTime: 60000 / this.options.ratelimit,
      id: "PIXELIC-API-LIMITER",

      datastore: this.options.redis.host === undefined ? "local" : "ioredis",
      clearDatastore: false,
      clientOptions: {
        host: this.options.redis.host,
        port: this.options.redis.port,
        username: this.options.redis.username,
        password: this.options.redis.password,
      },
    });

    this.leaderboardLimiter = new Bottleneck({
      minTime: 60000 / this.options.leaderboardRateLimit,
      id: "PIXELIC-API-LEADERBOARD-LIMITER",

      datastore: this.options.redis.host === undefined ? "local" : "ioredis",
      clearDatastore: false,
      clientOptions: {
        host: this.options.redis.host,
        port: this.options.redis.port,
        username: this.options.redis.username,
        password: this.options.redis.password,
      },
    });

    this.registerLimiter = new Bottleneck({
      minTime: (5 * 60000) / this.options.registerRateLimit,
      id: "PIXELIC-API-REGISTER-LIMITER",

      datastore: this.options.redis.host === undefined ? "local" : "ioredis",
      clearDatastore: false,
      clientOptions: {
        host: this.options.redis.host,
        port: this.options.redis.port,
        username: this.options.redis.username,
        password: this.options.redis.password,
      },
    });

    for (const func in API) {
      Client.prototype[func] = function (...args) {
        return API[func].apply(
          {
            makeRequest: this.makeRequest.bind(this),
          },
          args
        );
      };
    }
  }

  async makeRequest(url, method, type) {
    try {
      if (type === "LEADERBOARD") {
        return await this.leaderboardLimiter.schedule(async () => {
          return await fetch(`${url}?key=${this.key}`, { method: method == undefined ? "GET" : method });
        });
      }
      if (type === "REGISTER") {
        return await this.registerLimiter.schedule(async () => {
          return await fetch(`${url}?key=${this.key}`, { method: method == undefined ? "GET" : method });
        });
      }
      return await this.limiter.schedule(async () => {
        return await fetch(`${url}?key=${this.key}`, { method: method == undefined ? "GET" : method });
      });
    } catch (error) {
      console.error(error);
      return new Error(errors.UNEXPECTED_ERROR);
    }
  }
}

module.exports = Client;
