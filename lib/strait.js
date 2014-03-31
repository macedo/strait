var Options = require("options")
  , WebSocketServer = require("ws").Server;

module.exports = Strait = (function() {

  function Strait(options) {
    options = new Options({
      daemonize: false,
      idleTimeout: null,
      ssl: false,
      source: null,
      target: null,
      timeout: null
    }).merge(options);

    this.options = options.value;
    this.source = this.parseSource(this.options.source);
    this.target = this.parseTarget(this.options.target);
  }

  Strait.prototype.doProxy = function(client) {
    var address = client._socket.remoteAddress
      , target;

    client._socket.setTimeout(this.options.idleTimeout);

    target = Net.createConnection(this.target.port, this.target.host)
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
      .on("end", function() { client.close(); })
      .on("error", function() {
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
      .on("close", function(code, reason) { target.end();  })
      .on("error", function(error) { target.end(); });
  };

  Strait.prototype.init = function() {
    if (this.options.ssl) {
      var httpServer = require("https");
      server = httpServer.createServer({ cert: this.options.cert, key: this.options.cert });
    } else {
      var httpServer = require("http");
      server = httpServer.createServer();
    }

    if (this.options.timeout) { server.setTimeout(this.options.timeout); }

    server.on("listening", function() {
      timeoutTimer = setInterval(function(){
        if (this._connections === 0) {
          this.close();
          clearInterval(timeoutTimer);
        }
      }.bind(this), server.timeout);
    });

    server.listen(this.source.port, function() {
      wsProxyServer = new WebSocketServer({
        server: server,
        handleProtocols: function(protocols, fn) {
          if (protocols.indexOf("binary") >= 0) { fn(true, "binary"); }
          else if (protocols.indexOf("base64") >= 0) { fn(true, "base64"); }
          else { fn(false); }
        }
      });
      wsProxyServer.on("connection", this.doProxy);
    }.bind(this));
  };

  Strait.prototype.loadCert = function(cert) {
    return (cert) ?  fs.readFileSync(cert) : cert;
  };

  Strait.prototype.parseSource = function(source) {
    source = this._splitAndReverse(source);
    return { host: source[1] || "", port: parseInt(source[0], 10) };
  };

  Strait.prototype.parseTarget = function(target) {
    target = this._splitAndReverse(target);
    if (target.length == 1) { throw("target must be host:port"); }
    return { host: target[1], port: parseInt(target[0], 10) };
  };

  Strait.prototype._splitAndReverse = function(st) {
    return st.split(/:/).reverse();
  };

  return Strait;
})();
