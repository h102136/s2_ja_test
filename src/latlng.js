'use strict';

// LatLng object
// rawLat: original latitude value (int or string), rawLng: original longitude value (int or string)
// noWrap: boolean value, determine if the latitude and longitude should be wrapped and limited
function LatLng(rawLat, rawLng, noWrap) {
  var lat = parseFloat(rawLat); // convert 'rawLat' to float
  var lng = parseFloat(rawLng); // convert 'rawLng' to float

  // check if 'lat' or 'lng' is valid number
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error('Invalid LatLng object: (' + rawLat + ', ' + rawLng + ')');
  }

  // check if lat and lng should be wrapped and limit the latitude and longitude
  // ensure validity and consistency of geographic coordinates
  if (noWrap !== true) {
    lat = Math.max(Math.min(lat, 90), -90);  // clamp latitude into -90(Antarctica)..90 (Arctic)
    lng = ((lng + 180) % 360 + 360) % 360 - 180;  // wrap longitude into -180..180
  }

  return { lat: lat, lng: lng };
}

LatLng.DEG_TO_RAD = Math.PI / 180; // degrees to radians
LatLng.RAD_TO_DEG = 180 / Math.PI; // radians to degrees

// convert latitude and longitude to XYZ coordinates
function LatLngToXYZ(latLng) {
  var d2r = LatLng.DEG_TO_RAD;

  var phi = latLng.lat * d2r;
  var theta = latLng.lng * d2r;

  var cosphi = Math.cos(phi);

  return [Math.cos(theta) * cosphi, Math.sin(theta) * cosphi, Math.sin(phi)];
}

// convert XYZ coordinates to latitude and longitude
function XYZToLatLng(xyz) {
  var r2d = LatLng.RAD_TO_DEG;

  var lat = Math.atan2(xyz[2], Math.sqrt(xyz[0] * xyz[0] + xyz[1] * xyz[1]));
  var lng = Math.atan2(xyz[1], xyz[0]);

  return LatLng(lat * r2d, lng * r2d);
}
export { LatLng, LatLngToXYZ, XYZToLatLng };