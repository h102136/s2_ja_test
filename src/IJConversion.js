//ij is a two-dimensional integer coordinate representing the location of a cell projected from a sphere onto a plane.
// convert st to ij
export var STToIJ = function(st, order) {
    var maxSize = (1 << order);
  
    var singleSTtoIJ = function(st) {
      var ij = Math.floor(st * maxSize);
      return Math.max(0, Math.min(maxSize - 1, ij));
    };
  
    return [singleSTtoIJ(st[0]), singleSTtoIJ(st[1])];
  };
  
  // convert ij to st
  export var IJToST = function(ij, order, offsets) {
    var maxSize = (1 << order);
  
    return [
      (ij[0] + offsets[0]) / maxSize,
      (ij[1] + offsets[1]) / maxSize
    ];
  };

  // rotate and flip points for given parameters
export var rotateAndFlipQuadrant = function(n, point, rx, ry) {
  if (ry == 0) {
    if (rx == 1) {
      point.x = n - 1 - point.x;
      point.y = n - 1 - point.y;
    }

    var x = point.x;
    point.x = point.y;
    point.y = x;
  }
};