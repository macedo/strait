var RFBClient = require("./rfb_client")
  , TCPSocket = require("./tcp_socket");

module.exports = StraitViewer = function StraitViewer(container) {
  this.container = container;

  var host = "csysint0004.locaweb.com.br"
    , port = 45712
    , pass = "34gre7bj";


  this.tcpSocket = new TCPSocket(host, port, pass);
  this.rfbClient = new RFBClient(this.tcpSocket);
  this.addListeners();
};

StraitViewer.init = function(container) {
  var instance = new this(container);
  instance.init();
  return instance;
};

StraitViewer.prototype = {
  init: function() {
    console.log("initialize strait viewer");
    this.connect();
  },

  addListeners: function() {
    var _this = this;
    this.tcpSocket
      .on("closed", function() { console.log(log("The connection has <strong>closed</strong> :("));})
      .on("connected", function() { console.log("connected to " + this.host + ":" + this.port); })
      .on("data", function(data) { _this.rfbClient.dataReceived(data); });
  },

  connect: function() {
    this.tcpSocket.connect();
  }
};
