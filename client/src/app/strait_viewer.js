module.exports = StraitViewer = function StraitViewer(container) {
  this.container = container;
};

StraitViewer.init = function(container) {
  var instance = new this(container);
  instance.init();
  return instance;
};

StraitViewer.prototype = {
  init: function() {
    console.log("initialize strait viewer");
  }
};
