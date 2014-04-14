var Backbone = require("backbone");

module.exports = AppView = Backbone.View.extend({

  tagName: "iframe",

  attributes: {
    "src": "http://localhost:3000"
  },

  render: function() {
    this.$el.html();
    return this;
  }
});
