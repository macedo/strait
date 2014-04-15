var Backbone = require("backbone");

module.exports = AppView = Backbone.View.extend({

  tagName: "iframe",

  attributes: {
    "src": "http://localhost:3000",
    "allowtransparency": "true",
    "frameborder": "0",
    "tabindex": "0",
    "title": "Strait",
    "width": "100%",
    "scrolling": "no",
    "horizontalscrolling": "no",
    "verticalscrolling": "no"
  },

  render: function() {
    this.$el.html();
    return this;
  }
});
