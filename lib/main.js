var Client               = require("./client")
  , Commander            = require("./commander")
  , FS                   = require("fs")
  , Logger               = require("./logger")
  , Utils                = require("./utils")
  , WebSocketProxyServer = require("./ws_proxy_server");

var stream = (Commander.log === process.stdout) ? Commander.log : FS.createWriteStream(Commander.log);

var logger = new Logger();
logger.setStream(stream);

var source = Utils.parseSource(Commander.args[1])
  , target = Utils.parseTarget(Commander.args[2]);

logger.write("proxying from " + source.host + ":" + source.port +
             " to " + target.host + ":" + target.port);

var client = new Client(target, {
  idleTimeout: Commander.idleTimeout
});

var webSocketProxyServer = new WebSocketProxyServer(source, client, {
  timeout: Commander.timeout,
  cert: Commander.cert
});

webSocketProxyServer.init();
