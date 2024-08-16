'use strict';

// use ES6 import syntax to import LatLng, LatLngToXYZ, and XYZToLatLng from latlng.js
import { LatLng, LatLngToXYZ, XYZToLatLng } from './latlng.js'; 
var S2 = { L: {} };

// assign LatLng, LatLngToXYZ, and XYZToLatLng to S2 object
S2.L.LatLng = LatLng; 
S2.LatLngToXYZ = LatLngToXYZ;
S2.XYZToLatLng = XYZToLatLng;

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