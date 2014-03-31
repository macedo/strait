var express = require("express")
  , http    = require("http")
  , path    = require("path")
  , exphbs  = require("express3-handlebars")
  , config  = require("config.json")("./config.json")
  , router  = require("./lib/router");

var App = express();

App.engine("handlebars", exphbs({ defaultLayout: "application" }));

App.set("config", config);
App.set("pool", Array.apply(null, Array(config.pool.size)).map(function(_, i) {
  return config.pool.offset + i;
}));
App.set("views", __dirname + "/views");
App.set("view engine", "handlebars");

App.use(express.json());
App.use(express.urlencoded());
App.use(express.methodOverride());
App.use(express.cookieParser(""));
App.use(App.router);
App.use("/", express.static(path.join(__dirname, "public")));

router.initialize(App);

http.createServer(App).listen(3300);
