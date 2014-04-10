module.exports.initialize = function(app) {
  app.get("/", function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("OK");
    response.end();
  });

  app.get("/proxy-server", function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });

    var Crypto     = require("crypto")
      , hmac       = Crypto.createHmac("sha1", app.get("config").secret)
      , targetHost = request.param("host")
      , targetPort = request.param("port")
      , sourcePort = app.get("pool").pop()
      , policy = {
          "login": request.body.login,
          "host": request.get("host"),
          "port": sourcePort,
          "nounce": Crypto.randomBytes(64).toString("hex"),
          "timestamp": new Date().getTime()
        };


    //if (app.get("config").proxyServer.daemonize) {
    //  var Daemon = require("daemonize2").setup({
    //    main:    "main.js",
    //    name:    "strait",
    //    pidfile: "/var/run/strait/" + sourcePort + ".pid",
    //    argv: [sourcePort, targetHost, targetPort]
    //  });

    //  Daemon.start();
    //} else {
    //  var main = require("./main");
    //}


    hmac.update(JSON.stringify(policy));
    policy.signature = hmac.digest("hex");

    response.write(JSON.stringify(policy));
    response.end();
  });
};
