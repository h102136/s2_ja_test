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