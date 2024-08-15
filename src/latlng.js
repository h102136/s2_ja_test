'use strict';

// LatLng object
// rawLat: original latitude value (int or string), rawLng: origonal longitude value (int or string)
// noWrap: boolean value, determine if the latitude and longitude should be wrapped and limited
function LatLng(rawLat, rawLng, noWrap) {
  var lat = parseFloat(rawLat); // convert 'rawLat' to float
  var lng = parseFloat(rawLng); // convert 'rawLng' to float

  // check if 'lat' or 'lng' is vaild number
  if (isNaN(lat) || isNaN(lng)) {
    throw new Error('Invalid LatLng object: (' + rawLat + ', ' + rawLng + ')');
  }

  // check if lat and lng should be wrapped and limit the latitude and longitude
  // ensure validity and consistency of geographic coordinates
  if (noWrap !== true) {
    lat = Math.max(Math.min(lat, 90), -90);  // clamp latitude into -90(Antarctica)..90 (Arctic)
    lng = (lng + 180) % 360 + ((lng < -180 || lng === 180) ? 180 : -180);  // wrap longtitude into -180..180
  }

  return { lat: lat, lng: lng };
}

LatLng.DEG_TO_RAD = Math.PI / 180; //degrees to radians
LatLng.RAD_TO_DEG = 180 / Math.PI; //radians to degrees

export { LatLng };