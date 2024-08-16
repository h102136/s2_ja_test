import { expect } from 'chai';
import { S2 } from '../src/s2geometry.js';

describe('S2 Geometry Library', function() {
  // LatLngConversion
  it('should correctly import LatLng', function() {
    expect(S2.L.LatLng).to.be.a('function');


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

  // S2GeometryUtils
  it('largestAbsComponent should return the index of the largest absolute component', () => {
    expect(S2.largestAbsComponent([3, -4, 2])).to.equal(1);
  });

  it('faceXYZToUV should convert face and xyz to uv coordinates', () => {
    expect(S2.faceXYZToUV(0, [1, 2, 3])).to.deep.equal([2, 3]);
  });
  
  it('XYZToFaceUV should convert xyz to face and uv coordinates', () => {
    expect(S2.XYZToFaceUV([1, 2, 3])).to.deep.equal([2, [-0.3333333333333333, -0.6666666666666666]]);
  });

  it('FaceUVToXYZ should convert face and uv to xyz coordinates', () => {
    expect(S2.FaceUVToXYZ(0, [2, 3])).to.deep.equal([1, 2, 3]);
  });
  
  it('UVToST should convert uv to st coordinates', () => {
    expect(S2.UVToST([0, 0])).to.deep.equal([0.5, 0.5]);
  });

  it('STToUV should convert st to uv coordinates', () => {
    expect(S2.STToUV([0.5, 0.5])).to.deep.equal([0, 0]);
  });

  it('IJToST should convert ij to st coordinates', () => {
    expect(S2.IJToST([4, 4], 3, [0, 0])).to.deep.equal([0.5, 0.5]);
  });

  it('rotateAndFlipQuadrant should rotate and flip the quadrant', () => {
    let point = { x: 1, y: 2 };
    S2.rotateAndFlipQuadrant(4, point, 1, 0);
    expect(point).to.deep.equal({ x: 1, y: 2 });
  });  

  //HilbertUtils
  it('should return correct positions [0, 0] for x=0, y=0, order=2, face=0', () => {
    const result = S2.pointToHilbertQuadList(0, 0, 2, 0);
    expect(result).to.deep.equal([0, 0]);
  });
});