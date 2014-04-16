var Crypto = require("crypto")
  , config = require("easy-config");


function AuthenticationException(namespace, args) {
  this.message = "Bad Request";
  this.name = "AuthenticationException";
};

module.exports = {
  createAuthorization: function(login, server) {
    if (! (login && server)) {
      throw new AuthenticationException("ongenerateSignature", login, server);
    }

    var hmac = Crypto.createHmac("sha1", config.secret)
      , authorization = {
        "login": login,
        "server": server,
        "nonce": Crypto.randomBytes(64).toString("hex"),
        "timestamp": new Date().getTime()
      };

    hmac.update(JSON.stringify(authorization));
    authorization.signature = hmac.digest("hex");

    return JSON.stringify(authorization);
  }
};
