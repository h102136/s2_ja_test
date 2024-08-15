import { expect } from 'chai';
import { S2 } from '../src/s2geometry.js';

describe('S2 Geometry Library', function() {
  it('should correctly import LatLng', function() {
    expect(S2.L.LatLng).to.be.a('function');

    // 測試 LatLng 函數的基本功能
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
    expect(latLng.lat).to.equal(90); // 緯度應該被限制在 90
    expect(latLng.lng).to.be.within(-180, 180); // 經度應該被包裹在 -180 到 180 之間
  });
});