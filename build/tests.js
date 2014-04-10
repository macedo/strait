(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Buffer = require("../src/buffer");

describe("Buffer", function() {

  it("should exists", function() {
    expect(Buffer).toBeDefined();
  });
});

},{"../src/buffer":2}],2:[function(require,module,exports){
module.exports = Buffer = function() {
  var buffer = ""
    , index  = 0;

  return {
    append: function(str) { return buffer += str; },

    buffer: function() { return buffer; },

    clear: function() {
      buffer = "";
      index  = 0;
      return true;
    },

    length: function() { return buffer.length; },

    index: function() { return index; },

    decrementIndexBy: function(num) { index -= num; },

    readString: function(length) {
      index += length;
      return buffer.substr(index - length, length);
    },

    readUint8: function(num) {
      var bytesNumber = num || 1
        , encodedData = buffer.substr(index++, bytesNumber)
        , decodedData = "";

      for (var i = 0, length = encodedData.length; i < length; i++)
        decodedData += encodedData.charCodeAt(i);

      return decodedData;
    },

    readUint8Arr: function(num) {
      var bytesNumber = num || 1
        , encodedData = buffer.substr(index++, bytesNumber)
        , decodedData = [];

      for (var i = 0, length = encodedData.length; i < length; i++)
        decodedData.push(encodedData.charCodeAt(i));

      return decodedData;
    },


    readUint32: function() {
      return ( buffer.charCodeAt(index++) << 24
             | buffer.charCodeAt(index++) << 16
             | buffer.charCodeAt(index++) << 8
             | buffer.charCodeAt(index++) );
    }
  };
};


},{}]},{},[1]);