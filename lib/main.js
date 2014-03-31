(function() {
  var Strait = require("./strait");
  var strait = new Strait({
    source: "localhost:" + process.argv.shift(),
    target: process.argv.join(":")
  });

  strait.init();
}).call(this);
