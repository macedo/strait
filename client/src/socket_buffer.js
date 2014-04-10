module.exports = SocketBuffer = (function() {
  function SocketBuffer() {
    this.buffer = "";
    this.index  = 0;
  }

  SocketBuffer.prototype.append = function(str) { return this.buffer += str; },

  SocketBuffer.prototype.buffer = function() { return this.buffer; },

  SocketBuffer.prototype.clear = function() {
    this.buffer = "";
    this.index  = 0;
    return true;
  },

  SocketBuffer.prototype.length = function() { return this.buffer.length; },

  SocketBuffer.prototype.index = function() { return this.index; },

  SocketBuffer.prototype.readString = function(length) {
    this.index += length;
    return this.buffer.substr(this.index - length, length);
  };

  //SocketBuffer.prototype.readUint8 = function(num) {
  //     var bytesNumber = num || 1
  //      , encodedData = buffer.substr(index++, bytesNumber)
  //      , decodedData = "";

  //    for (var i = 0, length = encodedData.length; i < length; i++)
  //      decodedData += encodedData.charCodeAt(i);

  //    return decodedData;
  //  },

  //  readUint8Arr: function(num) {
  //    var bytesNumber = num || 1
  //      , encodedData = buffer.substr(index++, bytesNumber)
  //      , decodedData = [];

  //    for (var i = 0, length = encodedData.length; i < length; i++)
  //      decodedData.push(encodedData.charCodeAt(i));

  //    return decodedData;
  //  },


  //  readUint32: function() {
  //    return ( buffer.charCodeAt(index++) << 24
  //           | buffer.charCodeAt(index++) << 16
  //           | buffer.charCodeAt(index++) << 8
  //           | buffer.charCodeAt(index++) );
  //  }
  //};
  return SocketBuffer;
})();
