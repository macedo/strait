module.exports.initialize = function(app) {
  app.post("/auth", function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });

    var Crypto = require("crypto")
      , hmac   = Crypto.createHmac("sha1", app.get("config").secret)
      , policy = {
          "login": request.param("login"),
          "server": request.param("server"),
          "nounce": Crypto.randomBytes(64).toString("hex"),
          "timestamp": new Date().getTime()
        };

    hmac.update(JSON.stringify(policy));
    policy.signature = hmac.digest("hex");
    response.write(JSON.stringify(policy));
    response.end();
  });


  app.get("/", function(request, response) {
    response.render("index");
  });

};
