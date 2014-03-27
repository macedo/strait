var FS              = require("fs")
  , Logger          = require("./logger")
  , HTTP            = require("http")
  , HTTPS           = require("https")
  , WebSocketServer = require("ws").Server;

var logger = new Logger();

module.exports = WebSocketProxyServer = (function() {

  function WebSocketProxyServer(source, client, opts) {
    this.source  = source;
    this.client  = client;
    this.timeout = opts.timeout;
    this.cert    = this.loadCert(opts.cert);
  }

  WebSocketProxyServer.prototype.init = function() {
    if (this.hasCert()) {
      logger.write("running in encrypted HTTPS (wss://) mode using: "
                   + this.cert);
      server = HTTPS.createServer({ cert: this.cert, key: this.cert });
    } else {
      logger.write("running in unencrypted HTTP (ws://) mode");
      server = HTTP.createServer();
    }

    if (this.timeout) { server.setTimeout(this.timeout); }

    server.on("listening", function() {
      timeoutTimer = setInterval(function(){
        if (this._connections == 0) {
          this.close();
          clearInterval(timeoutTimer);
          logger.write("connection closed due inactivity");
        }
      }.bind(this), server.timeout);
    });

    server.listen(this.source.port, function() {
      wsProxyServer = new WebSocketServer({
        server: server,
        handleProtocols: function(protocols, fn) {
          if (protocols.indexOf("binary") >= 0) { fn(true, "binary"); }
          else if (protocols.indexOf("base64") >= 0) { fn(true, "base64"); }
          else {
            logger.write("Client must support 'binary' or 'base64' protocol");
            fn(false);
          }
        }
      });

      wsProxyServer.on("connection", this.client.doProxy.bind(this.client));
    }.bind(this));
  }


  WebSocketProxyServer.prototype.loadCert = function(cert) {
    return (cert) ?  FS.readFileSync(cert) : cert;
  };

  WebSocketProxyServer.prototype.hasCert = function() {
    return this.cert ? true : false;
  };

  return WebSocketProxyServer;
})();
