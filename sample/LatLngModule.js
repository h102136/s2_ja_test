'use strict';

import { LatLng, LatLngToXYZ, XYZToLatLng } from '../src/LatLngConversion.js';

const LatLngModule = {
  name: "LatLngConversion", // functon name
  functions: {
    "LatLngToXYZ": {
      func: LatLngToXYZ,
      params: [
        { name: 'lat', type: 'number', message: 'Lat:' },
        { name: 'lng', type: 'number', message: 'Lng:' }
      ]
    },
    "XYZToLatLng": {
      func: XYZToLatLng,
      params: [
        { name: 'x', type: 'number', message: 'X:' },
        { name: 'y', type: 'number', message: 'Y:' },
        { name: 'z', type: 'number', message: 'Z:' }
      ]
    }
  },
  // function to handle the function selection
  async handleFunctionSelection(functionName, answers) {
    if (functionName === 'LatLngToXYZ') {
      const latLng = LatLng(answers.lat, answers.lng, false);
      return this.functions[functionName].func(latLng);
    } else {
      const args = this.functions[functionName].params.map(param => answers[param.name]);
      return this.functions[functionName].func(...args);
    }
  }
};

export { LatLngModule };
