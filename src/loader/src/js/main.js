"use strict";

require(["jquery"], function ($) {
  window.Strait = (function(window, document, undefined) {
    function createIframe() {
      var attributes = {}
        , element    = document.createElement("iframe")
        , style      = "width: 100% !important;" +
                       "border: none !important;" +
                       "overflow: hidden !important;" +
                       "height: 321px !important;";

      attributes = {
        "allowtransparency":   true,
        "frameborder":         0,
        "horizontalscrolling": "no",
        "scrolling":           "no",
        "style":               style,
        "tabindex":            0,
        "title":               "Strait",
        "width":               "100%",
        "verticalscrolling":   "no",
      };

      for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
      }

      return element;
    }

    function init() {
      var target = document.getElementById("strait")
        , iframe = createIframe();

      target.insertBefore(iframe, target.firstChild);
    }

    init();
  })(window, document);
});
