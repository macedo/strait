var Crypto = require("crypto")
  , config = require("easy-config");


module.exports = {
  generateSignature: function(login, server) {
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
