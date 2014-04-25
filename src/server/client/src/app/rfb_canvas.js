module.exports = RFBCanvas = function RFBCanvas(canvas) {
  this.canvas  = canvas;
  this.context = canvas.getContext("2d");
};

RFBCanvas.prototype = {
  resize: function(width, height) {
    this.canvas.width  = width;
    this.canvas.height = height;
  },

  copyRect: function(x, y, w, h, src_x, src_y) {
    var canvasData = this.context.getImageData(src_x, src_y, w, h);
    this.context.putImageData(canvasData, x, y);
  },

  drawRect: function(xOffset, yOffset, w, h, rgbaData) {
    var canvasData = this.context.createImageData(w, h);

    for (var x = 0; x < w; x++) {
      for (var y = 0; y < w; y++) {
        var idx = (x + y * w) * 4
          , b = rgbaData[idx + 0]
          , g = rgbaData[idx + 1]
          , r = rgbaData[idx + 2]
          , a = rgbaData[idx + 3];

        canvasData.data[idx + 0] = r;
        canvasData.data[idx + 1] = g;
        canvasData.data[idx + 2] = b;
        canvasData.data[idx + 3] = a;
      }
   }

    this.context.putImageData(canvasData, xOffset, yOffset);
  }
};
