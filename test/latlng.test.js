import { expect } from 'chai';
import { LatLng, LatLngToXYZ, XYZToLatLng  } from '../src/latlng.js';


describe('LatLng', function() {
    // call 'LatLng' function with 45 and 90 as arguments
    it('should create a valid LatLng object test1(45,90)', function() {
    const latlng = LatLng(45, 90);
    // check if the returned object has the correct properties
    expect(latlng).to.deep.equal({ lat: 45, lng: 90 });
  });
    it('should create a valid LatLng object test2(-45,-90)', function() {
    const latlng = LatLng(-45, -90);
    expect(latlng).to.deep.equal({ lat: -45, lng: -90 });
  });

  // test if the latitude and longitude are clamped and wrapped correctly
  it('should clamp latitude to -90..90', function() {
    const latlng = LatLng(100, 90); // when latitude is greater than 90, it should be clamped to 90
    expect(latlng.lat).to.equal(90); // latitude should be 90
  });

  it('should wrap longitude to -180..180', function() {
    const latlng = LatLng(45, 200); 
    expect(latlng.lng).to.equal(-160);
  });

  it('should wrap longitude to -180..180 and latitude to -90..90 test1(100,200 =>90,-160)' , function() {
    const latlng = LatLng(100, 200); 
    expect(latlng.lng).to.equal(-160);
    expect(latlng.lat).to.equal(90);
  });

  it('should wrap longitude to -180..180 and latitude to -90..90 test2(-100,-200 =>-90,160)' , function() {
    const latlng = LatLng(-100, -200); 
    expect(latlng.lng).to.equal(160);
    expect(latlng.lat).to.equal(-90);
  });

  it('should wrap longitude to -180..180 and latitude to -90..90 test3(11111,11111 =>90,-49)' , function() {
    const latlng = LatLng(11111, 11111); 
    expect(latlng.lng).to.equal(-49);
    expect(latlng.lat).to.equal(90);
  });

  // an error should be thrown for invalid input
  it('should throw an error for invalid input', function() {
    expect(() => LatLng('invalid', 90)).to.throw('Invalid LatLng object: (invalid, 90)');
  });
  
  it('should not wrap latitude and longitude if noWrap is true', function() {
    const latlng = LatLng(100, 200, true);
    expect(latlng).to.deep.equal({ lat: 100, lng: 200 });
  });
});

// test LatLngToXYZ function
describe('LatLngToXYZ', function() {
  it('should convert latitude and longitude to XYZ coordinates test1 (45,90)', function() {
    const latLng = { lat: 45, lng: 90 };
    const result = LatLngToXYZ(latLng);
    const expected = [0, 0.7071067811865476, 0.7071067811865475]; //expected value

    expect(result[0]).to.be.closeTo(expected[0], 1e-10); //compare the result with the expected value, 1e-10 is the precision
    expect(result[1]).to.be.closeTo(expected[1], 1e-10); //result[] should be close to expected[] less than 1e-10
    expect(result[2]).to.be.closeTo(expected[2], 1e-10); 
  });
});

describe('LatLngToXYZ', function() {
  it('should convert latitude and longitude to XYZ coordinates test2 (45,45)', function() {
    const latLng = { lat: 45, lng: 45 };
    const result = LatLngToXYZ(latLng);
    const expected = [0.5, 0.5, 0.7071]; 
    
    expect(result[0]).to.be.closeTo(expected[0], 1e-3); //result[] should be close to expected[] less than 1e-3
    expect(result[2]).to.be.closeTo(expected[2], 1e-3); 
    expect(result[2]).to.be.closeTo(expected[2], 1e-3); 
  });
});

// test XYZToLatLng function
describe('XYZToLatLng', function() {
  it('should convert XYZ coordinates to latitude and longitude test1', function() {
    const xyz = [0, 0.7071067811865476, 0.7071067811865475];
    const result = XYZToLatLng(xyz);
    const expected = { lat: 45, lng: 90 }; 

    expect(result.lat).to.be.closeTo(expected.lat, 1e-10);
    expect(result.lng).to.be.closeTo(expected.lng, 1e-10);
  });
});

describe('XYZToLatLng', function() {
  it('should convert XYZ coordinates to latitude and longitude test2', function() {
    const xyz = [0.5, 0.5, 0.7071];
    const result = XYZToLatLng(xyz);
    const expected = { lat: 45, lng: 45 }; 

    expect(result.lat).to.be.closeTo(expected.lat, 1e-3);
    expect(result.lng).to.be.closeTo(expected.lng, 1e-3);
  });
});