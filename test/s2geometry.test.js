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

  it('largestAbsComponent should return the index of the largest absolute component', () => {
    expect(S2.largestAbsComponent([3, -4, 2])).to.equal(1);
  });

  it('FaceUVToXYZ should convert face and uv to xyz coordinates', () => {
    expect(S2.FaceUVToXYZ(0, [2, 3])).to.deep.equal([1, 2, 3]);
  });
  
  it('UVToST should convert uv to st coordinates', () => {
    expect(S2.UVToST([0, 0])).to.deep.equal([0.5, 0.5]);
  });

  it('rotateAndFlipQuadrant should rotate and flip the quadrant', () => {
    let point = { x: 1, y: 2 };
    S2.rotateAndFlipQuadrant(4, point, 1, 0);
    expect(point).to.deep.equal({ x: 1, y: 2 });
  });  
});