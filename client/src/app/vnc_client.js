var RFBCanvas = require("./rfb_canvas");

module.exports = VNCClient = function VNCClient(canvas) {
  this.rfbCanvas = new RFBCanvas(canvas);
  this.socket = false;
};

VNCClient.prototype.send = function(data) {
  this.socket.send(data, "binary");
};

VNCClient.prototype.serverInitComplete = function(rfbClient) {
  this.rfbCanvas.resize(rfbClient.frameBufferWidth, rfbClient.frameBufferHeight);
  document.title = rfbClient.serverName;
};

VNCClient.prototype.frameBufferUpdate = function(rfbClient, update) {
  this.rfbCanvas.drawRect(update.x, update.y, update.w, update.h, update.data);
};

VNCClient.prototype.frameBufferCopyrect = function(rfbClient, update){
  this.rfbCanvas.copyRect(update.x, update.y, update.w, update.h, update.src_x, update.src_y);
};

VNCClient.prototype.bindEvents = function(rfbClient) {
  var _this = this;

  rfbClient
    .on(rfbClient.VNC_SERVER_INIT_COMPLETE, function() {
      _this.serverInitComplete(this);
    })
    .on(rfbClient.VNC_FRAME_BUFFER_UPDATE, function(update) {
      _this.frameBufferUpdate(this, update);
    })
    .on(rfbClient.VNC_FRAME_BUFFER_COPYRECT, function(update) {
      _this.frameBufferCopyrect(this, update);
    });
};

VNCClient.prototype.connect = function(host, port, passwd) {
  var sock = new TCPClient(host, port, passwd);

  this._socket = sock;
  var rfb_client = new RFBClient(sock);
  this.bindEvents(rfb_client);

  sock.on("connected", function() {
    log("connected to " + host + ":" + port);
  });

  sock.on("closed", function() {
    log("The connection has <strong>closed</strong> :(");
  });

  sock.on("data", function(msg){
    rfb_client.dataReceived(msg);
  });

  sock.connect();
};
