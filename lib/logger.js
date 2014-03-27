var Singleton = require("create-singleton");

var Logger = Singleton(function Logger() {
  this.stream;
  this.setStream = function(stream) {
    this.stream = stream;
  };

  this.write = function(message) {
    this.stream.write("[" + new Date() + "]{" + process.pid + "} " + message + "\n")
  };
});

module.exports = Logger;
