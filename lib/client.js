var Buffer = require("buffer").Buffer
  , Logger = require("./logger")
  , Net    = require("net");

var logger = new Logger();

module.exports = Client = (function() {
  function Client(target, opts) {
    this.target = target;
    this.idleTimeout = opts.idleTimeout || 0;
  }

  Client.prototype.doProxy = function(client) {
    var address = client._socket.remoteAddress
      , target;

    client._socket.setTimeout(this.idleTimeout);

    logger.write("client connected: Version " + client.protocolVersion +
                 ", subprotocol: " + client.protocol);

    target = Net.createConnection(this.target.port, this.target.host, function() {
      logger.write("connected to target");
    })
      .on("data", function(data) {
        try {
          if (client.protocol === "base64")
            client.send(new Buffer(data).toString("base64"));
          else
            client.send(data, { binary: true });
        } catch(e) {
          target.end();
        }
      })
      .on("end", function() {
        logger.write("target disconnected");
        client.close();
      })
      .on("error", function() {
        logger.write("target connection error");
        target.end();
        target.close();
      });

    client
      .on("message", function(message) {
        if (client.protocol === "base64")
          target.write(new Buffer(message, "base64"));
        else
          target.write(message, "binary");
      })
      .on("timeout", function() { target.close(); })
      .on("close", function(code, reason) {
        logger.write("client disconnected: +" + code + "[ " + reason +"]");
        target.end();
      })
      .on("error", function(error) {
        logger.write("client error: " + error);
        target.end();
      });
  }

  return Client;
})();
