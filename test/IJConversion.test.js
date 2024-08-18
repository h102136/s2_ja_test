import { expect } from 'chai';
import { STToIJ, IJToST, rotateAndFlipQuadrant } from '../src/IJConversion.js';

describe('S2GeometryUtils', () => {
  
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
  
  });

  describe('rotateAndFlipQuadrant', () => {

    it('should rotate and flip the point correctly', () => {
      const point = { x: 1, y: 2 };
      rotateAndFlipQuadrant(4, point, 1, 0);
      expect(point).to.deep.equal({ x: 1, y: 2 });
    });
    
    it('should not rotate and flip the point when ry is 1', () => {
      const point = { x: 1, y: 2 };
      rotateAndFlipQuadrant(4, point, 0, 1);
      expect(point).to.deep.equal({ x: 1, y: 2 });
    });
  });