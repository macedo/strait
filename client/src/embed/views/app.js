var Backbone = require("backbone");

module.exports = AppView = Backbone.View.extend({

  tagName: "iframe",

  attributes: {
    "src": "http://globo.com"
  },

  render: function() {
    this.$el.html();
    return this;
  }
});
