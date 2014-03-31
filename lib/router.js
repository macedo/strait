module.exports.initialize = function(app) {
  app.get("/", function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("OK");
    response.end();
  });

  app.get("/proxy-server", function(request, response) {
    response.writeHead(200, { "Content-Type": "application/json" });

    var targetHost = request.param("host")
      , targetPort = request.param("port")
      , sourcePort = app.get("pool").pop();

    if (app.get("config").proxyServer.daemonize) {
      var Daemon = require("daemonize2").setup({
        main:    "main.js",
        name:    "strait",
        pidfile: "/var/run/strait/" + sourcePort + ".pid",
        argv: [sourcePort, targetHost, targetPort]
      });

      Daemon.start();
    } else {
      var main = require("./main");
    }

    response.write(JSON.stringify({
      "response": {
        "host": request.get("host"),
        "port": sourcePort
      }
    }));
    response.end();
  });

  app.get("/stats", function(request, response) {
    response.write("port pool size" + app.get("pool").length);
    response.end();
  });
};
