'use strict';

import { LatLng } from './latlng.js'; // 使用 ES 模塊語法導入 latlng.js

var S2 = { L: {} };

S2.L.LatLng = LatLng; // 將 LatLng 添加到 S2.L 對象中

export { S2 }; // 導出 S2 對象


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