import { expect } from 'chai';
import { S2CellUtils } from '../src/S2CellUtils.js';

describe('S2CellUtils', function() {
  
  describe('latLngToKey and keyToLatLng', function() {
    it('should convert LatLng to Hilbert QuadKey and back', function() {
      const lat = 37.7749;
      const lng = -122.4194;
      const level = 10;

      const key = S2CellUtils.latLngToKey(lat, lng, level);
      expect(key).to.be.a('string');

      const latLng = S2CellUtils.keyToLatLng(key);
      expect(latLng).to.have.property('lat');
      expect(latLng).to.have.property('lng');

      // Check that the lat/lng values are reasonably close
      expect(latLng.lat).to.be.closeTo(lat, 0.1);
      expect(latLng.lng).to.be.closeTo(lng, 0.1);
    });
  });

  describe('keyToId and idToKey', function() {
    it('should convert Hilbert QuadKey to S2 Cell ID and back', function() {
      const key = '3/210';
      const id = S2CellUtils.keyToId(key);
      expect(id).to.be.a('string');

      const keyFromId = S2CellUtils.idToKey(id);
      expect(keyFromId).to.equal(key);
    });
  });

  describe('idToLatLng', function() {
    it('should convert S2 Cell ID to LatLng', function() {
      const key = '3/210';
      const id = S2CellUtils.keyToId(key);
      const latLng = S2CellUtils.idToLatLng(id);

      expect(latLng).to.have.property('lat');
      expect(latLng).to.have.property('lng');
    });
  });

  describe('prevKey and nextKey', function() {
    it('should correctly calculate the previous and next Hilbert QuadKey', function() {
      const key = '3/210';

      const nextKey = S2CellUtils.nextKey(key);
      const prevKey = S2CellUtils.prevKey(nextKey);

      expect(prevKey).to.equal(key);
    });
  });
  
  describe('stepKey', function() {
    it('should correctly calculate step forward and backward', function() {
      const key = '3/210';

      const steppedForward = S2CellUtils.stepKey(key, 1);
      const steppedBackward = S2CellUtils.stepKey(steppedForward, -1);

      expect(steppedBackward).to.equal(key);
    });
  });
});
