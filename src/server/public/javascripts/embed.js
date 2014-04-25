var STRAIT = (function(window, undefined) {
  "use strict";

  var STRAIT = {};
  var containerID = "strait";

  function loadScript(url, callback) {
    var script = document.createElement("script");
    script.async = true;
    script.src = url;

    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(script, entry);

    script.onload = script.onreadystatechange = function() {
      var readyState = script.readyState;

      if (!readyState || /complete|loaded/.test(script.readyState)) {
        callback();
        script.onload = script.onreadystate = null;
      }
    };
  }

  function jsonToQueryString(data) {
    var q = "";

    for (var key in data)
      q += key + "=" + data[key] + "&";

    return q.slice(0, -1);
  }


  function init() {
    var target = document.getElementById(containerID)
      , iframe = document.createElement("iframe");

    var attribute = JSON.parse(target.getAttribute("data-strait"));
    target.removeAttribute("data-strait");

    var queryString = encodeURI(jsonToQueryString(attribute));

    iframe.src = "http://strait.locaweb.com.br?" + queryString;

    target.insertBefore(iframe, target.firstChild);
  }

  init();

  return STRAIT;
})(window);
