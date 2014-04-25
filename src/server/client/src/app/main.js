module.exports = App = function App() {};

App.prototype.init = function() {
  Mediator.publish("page:loaded");
};
