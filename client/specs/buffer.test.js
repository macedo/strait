var SocketBuffer = require("../src/socket_buffer");

describe("SocketBuffer", function() {
  var inSocket = new SocketBuffer();

  describe("Constructor", function() {
    it("should initialize new object", function() {
      expect(inSocket).to.be.an.instanceof(SocketBuffer);
    });

    it("buffer should be empty", function() {
      expect(inSocket.buffer).to.be.empty;
    });

    it("index should be 0(zero)", function() {
      expect(inSocket.index).to.be.equal(0);
    });
  });
});
