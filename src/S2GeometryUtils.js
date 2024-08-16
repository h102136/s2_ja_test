'use strict';

// the largest component of a vector
export var largestAbsComponent = function(xyz) {
  var temp = [Math.abs(xyz[0]), Math.abs(xyz[1]), Math.abs(xyz[2])]; // create an array of the absolute values of the vector
  
  // compare the absolute values of the vector
  if (temp[0] > temp[1]) {
    if (temp[0] > temp[2]) {
      return 0;
    } else {
      return 2;
    }
  } else {
    if (temp[1] > temp[2]) {
      return 1;
    } else {
      return 2;
    }
  }
};

// 'uv' is the position of a point on the sphere that projects to the cube surface after projection.
// convert face and xyz to uv
export var faceXYZToUV = function(face/*int 0-5*/, xyz) {
  var u, v; // u:The horizontal coordinate on the 2D plane, v:The vertical coordinate on the 2D plane

  switch (face) {
    case 0: u =  xyz[1]/xyz[0]; v =  xyz[2]/xyz[0]; break;
    case 1: u = -xyz[0]/xyz[1]; v =  xyz[2]/xyz[1]; break;
    case 2: u = -xyz[0]/xyz[2]; v = -xyz[1]/xyz[2]; break;
    case 3: u =  xyz[2]/xyz[0]; v =  xyz[1]/xyz[0]; break;
    case 4: u =  xyz[2]/xyz[1]; v = -xyz[0]/xyz[1]; break;
    case 5: u = -xyz[1]/xyz[2]; v = -xyz[0]/xyz[2]; break;
    default: throw {error: 'Invalid face'}; // throw an error if the face is invalid (not 0-5)
  }

  return [u, v];
};

// convert xyz to face and uv
export var XYZToFaceUV = function(xyz) {
  // get face from largest component of xyz  
  var face = largestAbsComponent(xyz);

  if (xyz[face] < 0) {
    face += 3;
  }
  // get uv coordinates
  var uv = faceXYZToUV(face, xyz);

  return [face, uv];
};

// convert face and uv to xyz
export var FaceUVToXYZ = function(face, uv) {
  var u = uv[0];
  var v = uv[1];

  switch (face) {
    case 0: return [ 1, u, v];
    case 1: return [-u, 1, v];
    case 2: return [-u, -v, 1];
    case 3: return [-1, -v, -u];
    case 4: return [ v, -1, -u];
    case 5: return [ v, u, -1];
    default: throw new Error('Invalid face');
  }
};

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

//
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

export var S2U = {
  XYZToFaceUV,
  FaceUVToXYZ,
  STToUV,
  UVToST,
  STToIJ,
  IJToST
};