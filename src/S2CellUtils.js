'use strict';

import { S2Cell } from './S2Cell.js';
import Long from 'long';

const S2CellUtils = {};

// define constants
S2CellUtils.FACE_BITS = 3;
S2CellUtils.MAX_LEVEL = 30;
S2CellUtils.POS_BITS = (2 * S2CellUtils.MAX_LEVEL) + 1; // 61 (60 bits of data, 1 bit lsb marker)

// convert face, position, and level to S2 Cell ID
S2CellUtils.facePosLevelToId = function(faceN, posS, levelN) {
    var faceB;
    var posB;
    var bin;

    if (!levelN) {
        levelN = posS.length;
    }
    if (posS.length > levelN) {
        posS = posS.substr(0, levelN);
    }

    // 3-bit face value
    faceB = Long.fromString(faceN.toString(10), true, 10).toString(2);
    while (faceB.length < S2CellUtils.FACE_BITS) {
        faceB = '0' + faceB;
    }

    // 60-bit position value
    posB = Long.fromString(posS, true, 4).toString(2);
    while (posB.length < (2 * levelN)) {
        posB = '0' + posB;
    }

    bin = faceB + posB;
    // 1-bit lsb marker
    bin += '1';
    // n-bit padding to 64-bits
    while (bin.length < (S2CellUtils.FACE_BITS + S2CellUtils.POS_BITS)) {
        bin += '0';
    }

    return Long.fromString(bin, true, 2).toString(10);
};

// convert quadkey to S2 Cell ID
S2CellUtils.keyToId = function(key) {
    var parts = key.split('/');
    return S2CellUtils.facePosLevelToId(parts[0], parts[1], parts[1].length);
};

// convert S2 Cell ID to quadkey
S2CellUtils.idToKey = function(idS) {
    var bin = Long.fromString(idS, true, 10).toString(2);

    while (bin.length < (S2CellUtils.FACE_BITS + S2CellUtils.POS_BITS)) {
        bin = '0' + bin;
    }

    var lsbIndex = bin.lastIndexOf('1');
    var faceB = bin.substring(0, 3);
    var posB = bin.substring(3, lsbIndex);
    var levelN = posB.length / 2;

    var faceS = Long.fromString(faceB, true, 2).toString(10);
    var posS = Long.fromString(posB, true, 2).toString(4);

    while (posS.length < levelN) {
        posS = '0' + posS;
    }

    return faceS + '/' + posS;
};

// convert quadkey to LatLng
S2CellUtils.keyToLatLng = function(key) {
    const cell = S2Cell.FromHilbertQuadKey(key);
    return cell.getLatLng();
};

// convert S2 Cell ID to LatLng
S2CellUtils.idToLatLng = function(id) {
    const key = S2CellUtils.idToKey(id);
    return S2CellUtils.keyToLatLng(key);
};

//  convert LatLng to quadkey
S2CellUtils.latLngToKey = function(lat, lng, level) {
    if (isNaN(level) || level < 1 || level > 30) {
        throw new Error("'level' is not a number between 1 and 30 (but it should be)");
    }
    return S2Cell.FromLatLng({ lat: lat, lng: lng }, level).toHilbertQuadkey();
};


S2CellUtils.stepKey = function(key, num) {
    var parts = key.split('/');
    var faceS = parts[0];
    var posS = parts[1];
    var level = parts[1].length;

    var posL = Long.fromString(posS, true, 4);
    var otherL;
    if (num > 0) {
        otherL = posL.add(Math.abs(num));
    } else if (num < 0) {
        otherL = posL.subtract(Math.abs(num));
    }
    var otherS = otherL.toString(4);

    if ('0' === otherS) {
        console.warning(new Error("face/position wrapping is not yet supported"));
    }

    while (otherS.length < level) {
        otherS = '0' + otherS;
    }

    return faceS + '/' + otherS;
};

// calculate the previous Hilbert QuadKey
S2CellUtils.prevKey = function(key) {
    return S2CellUtils.stepKey(key, -1);
};

// calculate the next Hilbert QuadKey
S2CellUtils.nextKey = function(key) {
    return S2CellUtils.stepKey(key, 1);
};

export { S2CellUtils };
