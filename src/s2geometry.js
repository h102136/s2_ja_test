'use strict';

// use ES6 import syntax to import LatLng, LatLngToXYZ, and XYZToLatLng from latlng.js
import { LatLng, LatLngToXYZ, XYZToLatLng } from './LatLngConversion.js'; 
import { S2U, largestAbsComponent, faceXYZToUV, singleSTtoUV, singleUVtoST, rotateAndFlipQuadrant }from './S2GeometryUtils.js';
import { pointToHilbertQuadList } from './HilbertUtils.js';
var S2 = { L: {} };

// assign LatLng, LatLngToXYZ, and XYZToLatLng to S2 object
S2.L.LatLng = LatLng; 
S2.LatLngToXYZ = LatLngToXYZ;
S2.XYZToLatLng = XYZToLatLng;

S2.largestAbsComponent = largestAbsComponent;
S2.faceXYZToUV = faceXYZToUV;
S2.XYZToFaceUV = S2U.XYZToFaceUV;
S2.FaceUVToXYZ = S2U.FaceUVToXYZ;
S2.singleSTtoUV = singleSTtoUV;
S2.STToUV = S2U.STToUV;
S2.singleUVtoST = singleUVtoST;
S2.UVToST = S2U.UVToST;
S2.STToIJ = S2U.STToIJ;
S2.IJToST = S2U.IJToST;
S2.rotateAndFlipQuadrant = rotateAndFlipQuadrant;

S2.pointToHilbertQuadList = pointToHilbertQuadList;
// export S2 object
export { S2 }; 

/*
S2.LatLngToXYZ = function(latLng) {
  // http://stackoverflow.com/questions/8981943/lat-long-to-x-y-z-position-in-js-not-working
  var lat = latLng.lat;
  var lon = latLng.lng;
  var DEG_TO_RAD = Math.PI / 180.0;

  var phi = lat * DEG_TO_RAD;
  var theta = lon * DEG_TO_RAD;

  var cosLat = Math.cos(phi);
  var sinLat = Math.sin(phi);
  var cosLon = Math.cos(theta);
  var sinLon = Math.sin(theta);
  var rad = 500.0;

  return [
    rad * cosLat * cosLon
  , rad * cosLat * sinLon
  , rad * sinLat
  ];
};
*/