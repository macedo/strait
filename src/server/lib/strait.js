var TCPUtil = { };

TCPUtil.prepareForTransmit = JSON.stringify;
TCPUtil.cleanFromTransmit  = JSON.parse;
TCPUtil.log                = function(msg) { console.log(msg); };

module.exports = Strait = function(socketio_client, encoding, nodelay) {
  var sock_encoding = encoding || "utf8";
  var opt_nodelay = nodelay || false;

  var net = require("net");
  var socket = new net.Socket();

  socket.setEncoding(sock_encoding);
  socket.setNoDelay(opt_nodelay);

  var client = socketio_client;
  var sock_connected = false;
  var socketio_connected = true;

  client
    .on("disconnect", function() {
      socketio_connected = false;
      if (sock_connected)
        socket.destroy();

      sock_connected = false;
      TCPUtil.log("socketio client disconnected.");
    })
    .on("message", function(data) {
      data = TCPUtil.cleanFromTransmit(data);
      switch (data.action) {
        case "connect":
          TCPUtil.log("connect request received: " + data.host + ":" + data.port);
          socket.connect(data.port, data.host);
          break;
        case "connected":
          TCPUtil.log("connected to: " + data.host + ":" + data.port);
          break;
        case "disconnect":
          if (sock_connected)
            socket.end();
          break;
        case "data":
          if (sock_connected) {
            TCPUtil.log("[CLI] data arrived:" + data.data + " , length: " + data.data.length + ", encoding: " + data.encoding);
            socket.write(data.data, data.encoding);
          }
          break;
        default:
          break;
      }
    });

  socket
    .on("connect", function() {
      sock_connected = true;
      TCPUtil.log("socket connected");
      if (socketio_connected)
        client.send(TCPUtil.prepareForTransmit({ action: "connected" }));
    })
    .on("data", function(sck_data) {
      TCPUtil.log("[SOCKET] data arrived:" + sck_data + ", length: " + sck_data.length + ", " + sock_encoding );
      if (socketio_connected) {
        client.send(TCPUtil.prepareForTransmit({
          action: "data",
          encoding: sock_encoding,
          data: sck_data
        }));
      }
    })
    .on("end", function() {
      sock_connected = false;
      TCPUtil.log("socket ended");
      if (socketio_connected)
        client.send(TCPUtil.prepareForTransmit({ action: "closed" }));
    })
    .on("error", function(e) {
      TCPUtil.log(e);
      this.end();
    });
};
