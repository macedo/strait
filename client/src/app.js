var Mediator          = require("./mediator")
  , ComponentsManager = require("./components_manager").init(Mediator)
  , App               = require("./app/main")
  , app               = new App();

$(function() { app.init(); });
