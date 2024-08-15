import { expect } from 'chai';
import { LatLng } from '../src/latlng.js';


describe('LatLng', function() {
    // 
    it('should create a valid LatLng object', function() {
    const latlng = LatLng(45, 90);
    expect(latlng).to.deep.equal({ lat: 45, lng: 90 });
  });

  it('should clamp latitude to -90..90', function() {
    const latlng = LatLng(100, 90);
    expect(latlng.lat).to.equal(90);
  });

  it('should wrap longitude to -180..180', function() {
    const latlng = LatLng(45, 200);
    expect(latlng.lng).to.equal(-160);
  });

  it('should throw an error for invalid input', function() {
    expect(() => LatLng('invalid', 90)).to.throw('Invalid LatLng object: (invalid, 90)');
  });

  it('should not wrap latitude and longitude if noWrap is true', function() {
    const latlng = LatLng(100, 200, true);
    expect(latlng).to.deep.equal({ lat: 100, lng: 200 });
  });
});