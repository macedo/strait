var Backbone = require("backbone")
  , AppView  = require("./views/app");


module.exports = App = function App() {
  this.view = new AppView();
};

App.prototype.init = function(element) {
  $(element).append(this.view.render().el);
};
