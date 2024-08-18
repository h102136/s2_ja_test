'use strict';
import { LatLng, LatLngToXYZ, XYZToLatLng } from './LatLngConversion.js'; 
import { faceXYZToUV, XYZToFaceUV, FaceUVToXYZ }from './FaceUVConversion.js';
import { STToUV, UVToST } from './STUVConversion.js';
import { STToIJ, IJToST, rotateAndFlipQuadrant } from './IJConversion.js';
import { pointToHilbertQuadList } from './HilbertCurve.js';
import { S2Cell } from './S2Cell.js';
import { S2CellUtils } from './S2CellUtils.js';

const S2 = {
    L: {
        LatLng,
    },
    LatLngToXYZ,
    XYZToLatLng,
    FaceXYZToUV: faceXYZToUV,
    XYZToFaceUV,
    FaceUVToXYZ,
    STToUV,
    UVToST,
    STToIJ,
    IJToST,
    rotateAndFlipQuadrant,
    pointToHilbertQuadList,
    S2Cell,
    S2CellUtils,
};

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