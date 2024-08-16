import { expect } from 'chai';
import { S2 } from '../src/s2geometry.js';

describe('S2 Geometry Library', function() {
  it('should correctly import LatLng', function() {
    expect(S2.L.LatLng).to.be.a('function');

    // test if the imported LatLng function is the same as the one in latlng.js
    const latLng = S2.L.LatLng(45, 90);
    expect(latLng).to.have.property('lat', 45);
    expect(latLng).to.have.property('lng', 90);
  });

  it('should throw an error for invalid LatLng values', function() {
    expect(() => S2.L.LatLng('invalid', 90)).to.throw('Invalid LatLng object: (invalid, 90)');
    expect(() => S2.L.LatLng(45, 'invalid')).to.throw('Invalid LatLng object: (45, invalid)');
  });

  it('should wrap latitude and longitude correctly', function() {
    const latLng = S2.L.LatLng(100, 200);
    expect(latLng.lat).to.equal(90); 
    expect(latLng.lng).to.equal(-160); 
  });
});