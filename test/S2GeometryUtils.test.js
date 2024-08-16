import { expect } from 'chai';
import { largestAbsComponent, faceXYZToUV, XYZToFaceUV, FaceUVToXYZ, STToUV, UVToST, STToIJ, IJToST, rotateAndFlipQuadrant } from '../src/S2GeometryUtils.js';

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

  // convert st to uv coordinates
  it('STToUV should convert st to uv coordinates', () => {
    expect(STToUV([0.5, 0.5])).to.deep.equal([0, 0]);
    expect(STToUV([0.75, 0.25])).to.deep.equal([0.41666666666666663, -0.41666666666666663]);
  });

  // convert uv to st coordinates
  it('UVToST should convert uv to st coordinates', () => {
    expect(UVToST([0, 0])).to.deep.equal([0.5, 0.5]);
    expect(UVToST([0.3333333333333333, -0.3333333333333333])).to.deep.equal([0.7071067811865476, 0.2928932188134524]);
  });

  // convert st to ij coordinates
  it('STToIJ should convert st to ij coordinates', () => {
    expect(STToIJ([0.5, 0.5], 3)).to.deep.equal([4, 4]);
    expect(STToIJ([0.75, 0.25], 3)).to.deep.equal([6, 2]);
  });

  // convert ij to st coordinates
  it('IJToST should convert ij to st coordinates', () => {
    expect(IJToST([4, 4], 3, [0, 0])).to.deep.equal([0.5, 0.5]);
    expect(IJToST([6, 2], 3, [0, 0])).to.deep.equal([0.75, 0.25]);
  });

  // rotate and flip the quadrant
  it('rotateAndFlipQuadrant should rotate and flip the quadrant', () => {
    let point = { x: 1, y: 2 };
    rotateAndFlipQuadrant(4, point, 1, 0);
    expect(point).to.deep.equal({ x: 1, y: 2 });

    point = { x: 1, y: 2 };
    rotateAndFlipQuadrant(4, point, 0, 0);
    expect(point).to.deep.equal({ x: 2, y: 1 });
  });
});