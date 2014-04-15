var TCPUtil = { };
TCPUtil.prepareForTransmit = JSON.stringify;
TCPUtil.cleanFromTransmit  = JSON.parse;

module.exports = TCPSocket = function TCPSocket(host, port, passwd) {
  this.host = host;
  this.port = port;
  this.password = passwd;

  this.connectedToSocket = false; // are we connected to socketio
  this.connected = false;         // do we have a connection to the TCP endpoint

  this.callbacks = {};
};

TCPSocket.prototype = {
  emit: function(event, param) {
    if (typeof this.callbacks[event] === "function")
      this.callbacks[event].call(this, param);
  },

  on: function(event, callback) {
    if (typeof callback === "function")
      this.callbacks[event] = callback;
    return this;
  },

  disconnect: function() {
    if (this.connectedToSocket)
      this._socket.send(TCPUtil.prepareForTransmit({action: "disconnect"}));
  },

  send: function(data, encoding) {
    if (this.connectedToSocket && this.connected)
      this.socket.send(TCPUtil.prepareForTransmit({
        action: "data",
        encoding: encoding || "utf8",
        data: data
      }));
  },

  connect: function() {
    var _this = this;

    if (typeof this.socket === "undefined" || this.socket === null)
      this.socket = io.connect("http://localhost:3000");


    this.socket
      .on("connect", function(){
        _this.connectedToSocket = true;
        _this.socket.send(TCPUtil.prepareForTransmit({
          action: "connect",
          host: _this.host,
          port: _this.port
        }));
      })
      .on("disconnect", function() {
        _this.connectedToSocket = false;
        _this.connected = false;
        _this.emit("error", "The socket io connection was lost");
      })
      .on("message", function(message) {
        message = TCPUtil.cleanFromTransmit(message);
        switch(message.action){
          case "connected":
            _this.connected = true;
            _this.emit("connected");
            break;
          case "data":
            _this.emit("data", { encoding: message.encoding, data: message.data });
            break;
          case "closed":
            _this.connected = false;
            _this.emit("closed");
            break;
          default:
        }
      });

    return this;
  }
};
