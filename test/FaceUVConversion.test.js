import { expect } from 'chai';
import { largestAbsComponent, faceXYZToUV, XYZToFaceUV, FaceUVToXYZ } from '../src/FaceUVConversion.js';

describe('S2GeometryUtils', () => {
  // find the largest absolute component of a vector as the face of the S2 cell  
  it('largestAbsComponent should return the index of the largest absolute component', () => {
    expect(largestAbsComponent([3, -4, 2])).to.equal(1);
    expect(largestAbsComponent([-5, 2, 3])).to.equal(0);
    expect(largestAbsComponent([1, 2, -6])).to.equal(2);
  });

  // convert face and xyz to uv coordinates
  it('faceXYZToUV should convert face and xyz to uv coordinates', () => {
    expect(faceXYZToUV(0, [1, 2, 3])).to.deep.equal([2, 3]);
    expect(faceXYZToUV(1, [1, 2, 3])).to.deep.equal([-0.5, 1.5]);
    expect(faceXYZToUV(2, [1, 2, 3])).to.deep.equal([-0.3333333333333333, -0.6666666666666666]);
  });

  // convert xyz to face and uv coordinates
  it('XYZToFaceUV should convert xyz to face and uv coordinates', () => {
    expect(XYZToFaceUV([1, 2, 3])).to.deep.equal([2, [-0.3333333333333333, -0.6666666666666666]]);
    expect(XYZToFaceUV([-1, -2, -3])).to.deep.equal([5, [-0.6666666666666666, -0.3333333333333333]]);
  });

  // convert face and uv to xyz coordinates
  it('FaceUVToXYZ should convert face and uv to xyz coordinates', () => {
    expect(FaceUVToXYZ(0, [2, 3])).to.deep.equal([1, 2, 3]);
    expect(FaceUVToXYZ(1, [-0.5, 1.5])).to.deep.equal([0.5, 1, 1.5]);
  });
});