var Crypto = require("crypto");

function AuthenticationException(namespace, args) {
  this.message = "Bad Request";
  this.name = "AuthenticationException";
};

module.exports = (function() {
  var timestamp = new Date().getTime();

  function createAuthorization(login, server) {
    if (! (login && server)) {
      throw new AuthenticationException("ongenerateSignature", login, server);
    }

    var config = require("easy-config")
      , hmac   = Crypto.createHmac("sha1", config.secret)
      , authorization = {};

    authorization.login     = login;
    authorization.server    = server;
    authorization.nonce     = _createNonce();
    authorization.timestamp = timestamp;

    hmac.update(JSON.stringify(authorization));
    authorization.signature = hmac.digest("hex");

    return JSON.stringify(authorization);
  };

  function _createNonce() {
    var config = require("easy-config")
      , redis  = require("./redis")
      , nonce  = Crypto.randomBytes(64).toString("hex");

    redis.setex(nonce, config.nonce.ttl, timestamp);
    return nonce;
  };

  return {
    createAuthorization: createAuthorization
  }
})();
