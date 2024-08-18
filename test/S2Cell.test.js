import { expect } from 'chai';
import { S2Cell } from '../src/S2Cell.js';

describe('S2Cell', function() {
  describe('FromHilbertQuadKey', function() {
    it('should create an S2Cell from a Hilbert Quadkey', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      expect(cell).to.be.an.instanceof(S2Cell);
      expect(cell.face).to.equal(3);
      expect(cell.ij).to.deep.equal([6, 4]);
      expect(cell.level).to.equal(3);
    });
  });

  describe('FromLatLng', function() {
    it('should create an S2Cell from latitude and longitude', function() {
      const latLng = { lat: 45, lng: 90 };
      const level = 10;
      const cell = S2Cell.FromLatLng(latLng, level);
      expect(cell).to.be.an.instanceof(S2Cell);
      expect(cell.level).to.equal(level);
    });
  });

  describe('toString', function() {
    it('should return the correct string representation of the S2Cell', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      expect(cell.toString()).to.equal('F3ij[6,4]@3');
    });
  });

  describe('getLatLng', function() {
    it('should return the correct latitude and longitude for the S2Cell', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      const latLng = cell.getLatLng();
      expect(latLng).to.have.property('lat');
      expect(latLng).to.have.property('lng');
    });
  });

  describe('getCornerLatLngs', function() {
    it('should return an array of 4 corner LatLng objects', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      const corners = cell.getCornerLatLngs();
      expect(corners).to.be.an('array').that.has.lengthOf(4);
      corners.forEach(corner => {
        expect(corner).to.have.property('lat');
        expect(corner).to.have.property('lng');
      });
    });
  });

  describe('toHilbertQuadkey', function() {
    it('should return the correct Hilbert Quadkey for the S2Cell', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      const quadkey = cell.toHilbertQuadkey();
      expect(quadkey).to.equal(hilbertQuadkey);
    });
  });

  describe('getNeighbors', function() {
    it('should return an array of neighboring S2Cells', function() {
      const hilbertQuadkey = '3/210';
      const cell = S2Cell.FromHilbertQuadKey(hilbertQuadkey);
      const neighbors = cell.getNeighbors();
      expect(neighbors).to.be.an('array').that.has.lengthOf(4);
      neighbors.forEach(neighbor => {
        expect(neighbor).to.be.an.instanceof(S2Cell);
      });
    });
  });
});
