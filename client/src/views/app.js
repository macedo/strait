var Backbone = require("backbone");

module.exports = AppView = Backbone.View.extend({
  template: require("../../templates/app.hbs"),

  initialize: function() {},

  render: function() {
    this.$el.html(this.template());
    return this;
  }
});
