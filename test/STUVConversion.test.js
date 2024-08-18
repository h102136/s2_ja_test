import { expect } from 'chai';
import { singleSTtoUV, STToUV, singleUVtoST, UVToST } from '../src/STUVConversion.js';

describe('S2GeometryUtils', () => {
  
  // convert single st to uv
  it('should return correct UV value for st >= 0.5', function() {
    expect(singleSTtoUV(0.5)).to.be.closeTo(0, 0.0001);
    expect(singleSTtoUV(0.75)).to.be.closeTo(0.4166666666666666, 0.0001);
    expect(singleSTtoUV(1)).to.be.closeTo(0.9999999999999999, 0.0001);
  });
  it('should return correct UV value for st < 0.5', function() {
    expect(singleSTtoUV(0.25)).to.be.closeTo(-0.4166666666666666, 0.0001);
    expect(singleSTtoUV(0)).to.be.closeTo(-0.9999999999999999, 0.0001);
  });

  // convert st to uv coordinates
  it('STToUV should convert st to uv coordinates', () => {
    expect(STToUV([0.5, 0.5])).to.deep.equal([0, 0]);
    expect(STToUV([0.75, 0.25])).to.deep.equal([0.41666666666666663, -0.41666666666666663]);
  });

  // convert single uv to st
  it('should return correct ST value for uv >= 0', function() {
    expect(singleUVtoST(0)).to.be.closeTo(0.5, 0.0001);
    expect(singleUVtoST(0.3333)).to.be.closeTo(0.7071, 0.0001);
    expect(singleUVtoST(1)).to.be.closeTo(1, 0.0001);
  });
  it('should return correct ST value for uv < 0', function() {
    expect(singleUVtoST(-0.3333)).to.be.closeTo(0.2929, 0.0001);
    expect(singleUVtoST(-1)).to.be.closeTo(0, 0.0001);
  });

  // convert uv to st coordinates
  it('UVToST should convert uv to st coordinates', () => {
    expect(UVToST([0, 0])).to.deep.equal([0.5, 0.5]);
    expect(UVToST([0.3333333333333333, -0.3333333333333333])).to.deep.equal([0.7071067811865476, 0.2928932188134524]);
  });
});