var express  = require("express")
  , http     = require("http")
  , path     = require("path")
  , exphbs   = require("express3-handlebars")
  , config   = require("easy-config")
  , util     = require("util")
  , socketio = require("socket.io")
  , Strait   = require("./lib/strait")
  , router   = require("./lib/router");

var App = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

App.engine("handlebars", exphbs({ defaultLayout: "application" }));

App.set("views", __dirname + "/views");
App.set("view engine", "handlebars");

App.use(express.json());
App.use(express.urlencoded());
App.use(express.methodOverride());
App.use(express.cookieParser(""));
App.use(allowCrossDomain);
App.use(App.router);
App.use("/", express.static(path.join(__dirname, "public")));

router.initialize(App);

server = http.createServer(App);
server.listen(config.port);

var io = socketio.listen(server);
io.set("log level", 0);
io.sockets.on("connection", function(client) {
  console.log("new connection");
  new Strait(client, "binary");
});
