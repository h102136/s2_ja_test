import { S2CellUtils } from './S2CellUtils.js';

const hilbertKey = S2CellUtils.latLngToKey(37.7749, -122.4194, 10);
console.log(hilbertKey);

const latLng = S2CellUtils.keyToLatLng(hilbertKey);
console.log(latLng);
