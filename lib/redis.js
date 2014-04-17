module.exports = (function() {
  var config    = require("easy-config")
    , client    = null
    , connected = false
    , namespace = config.redis.namespace;

  function _createClient() {
    var redis = require("redis");

    if(!connected) {
      client    = redis.createClient(config.redis.port, config.redis.host);
      connected = true;
    }

    return client;
  };

  function setex(key, ttl, value) {
    var client = _createClient();
    client.setex(namespace + ":" + key, ttl, value);
  };

  return {
    setex: setex
  }
})();
