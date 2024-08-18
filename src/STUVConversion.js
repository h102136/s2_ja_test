// 'st' is a point that is projected from a sphere to a unit square on a two-dimensional plane.
// convert st to uv
export var singleSTtoUV = function(st) {
    if (st >= 0.5) {
      return (1/3.0) * (4*st*st - 1);
    } else {
      return (1/3.0) * (1 - (4*(1-st)*(1-st)));
    }
  };
  
  // convert st to uv
  export var STToUV = function(st) {
    return [singleSTtoUV(st[0]), singleSTtoUV(st[1])];
  };
  
  // convert single st to single uv
  export var singleUVtoST = function(uv) {
    if (uv >= 0) {
      return 0.5 * Math.sqrt(1 + 3*uv);
    } else {
      return 1 - 0.5 * Math.sqrt(1 - 3*uv);
    }
  };
  
  // convert uv to st
  export var UVToST = function(uv) {
    return [singleUVtoST(uv[0]), singleUVtoST(uv[1])];
  };