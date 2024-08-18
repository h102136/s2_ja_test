'use strict';
import { LatLngToXYZ, XYZToLatLng } from './LatLngConversion.js'; 
import { XYZToFaceUV, FaceUVToXYZ }from './FaceUVConversion.js';
import { STToUV, UVToST } from './STUVConversion.js';
import { STToIJ, IJToST, rotateAndFlipQuadrant } from './IJConversion.js';
import { pointToHilbertQuadList } from './HilbertCurve.js';

class S2Cell {
    constructor() {
        this.face = null;
        this.ij = null;
        this.level = null;
    }
    // convert Hilbert Quadkey to S2 Cell
    static FromHilbertQuadKey(hilbertQuadkey) {
        const parts = hilbertQuadkey.split('/'); // split quadkey as face and position
        const face = parseInt(parts[0]); // an integer representing the face of the S2 Cell
        const position = parts[1]; // a string representing the position of the S2 Cell on the face
        const maxLevel = position.length; // the maximum level of the S2 Cell
        const point = { x: 0, y: 0 };

        for (let i = maxLevel - 1; i >= 0; i--) {
            const level = maxLevel - i;
            const bit = position[i];
            let rx = 0, ry = 0; // the rotation and flip parameters

            if (bit === '1') {
                ry = 1;
            } else if (bit === '2') {
                rx = 1;
                ry = 1;
            } else if (bit === '3') {
                rx = 1;
            }

            const val = Math.pow(2, level - 1);
            rotateAndFlipQuadrant(val, point, rx, ry); // rotate and flip the quadrant
            // update the point
            point.x += val * rx;
            point.y += val * ry;
        }
        // adjust the point based on the face (odd faces require swapping x and y)
        if (face % 2 === 1) {
            const t = point.x;
            point.x = point.y;
            point.y = t;
        }
        // return the S2 Cell
        return S2Cell.FromFaceIJ(parseInt(face), [point.x, point.y], maxLevel);
    }
    
    // accept a LatLng object and a level and return the S2 Cell
    static FromLatLng(latLng, level) {
        // check if latLng is an object with lat and lng properties
        if ((!latLng.lat && latLng.lat !== 0) || (!latLng.lng && latLng.lng !== 0)) {
            throw new Error("Pass { lat: lat, lng: lng } to S2Cell.FromLatLng");
        }
        const xyz = LatLngToXYZ(latLng);
        const faceuv = XYZToFaceUV(xyz);
        const st = UVToST(faceuv[1]);
        const ij = STToIJ(st, level);
        return S2Cell.FromFaceIJ(faceuv[0], ij, level);
    }

    // accept a face, ij, and level and return the S2 Cell
    static FromFaceIJ(face, ij, level) {
        const cell = new S2Cell();
        cell.face = face;
        cell.ij = ij;
        cell.level = level;
        return cell;
    }

    // return the string representation of the S2 Cell
    toString() {
        return `F${this.face}ij[${this.ij[0]},${this.ij[1]}]@${this.level}`;
    }

    // return the LatLng object of the S2 Cell
    getLatLng() {
        const st = IJToST(this.ij, this.level, [0.5, 0.5]);
        const uv = STToUV(st);
        const xyz = FaceUVToXYZ(this.face, uv);
        return XYZToLatLng(xyz);
    }

    // return an array of 4 corner LatLng objects
    getCornerLatLngs() {
        const result = []; // store the corner LatLng objects
        const offsets = [ // the offsets for each corner
            [0.0, 0.0], // bottom-left
            [0.0, 1.0], // top-left
            [1.0, 1.0], // top-right
            [1.0, 0.0]  // bottom-right
        ];
        // iterate through each corner
        for (let i = 0; i < 4; i++) {
            const st = IJToST(this.ij, this.level, offsets[i]);
            const uv = STToUV(st);
            const xyz = FaceUVToXYZ(this.face, uv);
            result.push(XYZToLatLng(xyz));
        }
        return result;
    }

    // return the face and an array of quads
    getFaceAndQuads() {
        const quads = pointToHilbertQuadList(this.ij[0], this.ij[1], this.level, this.face);
        return [this.face, quads];
    }

    // return the Hilbert Quadkey of the S2 Cell
    toHilbertQuadkey() {
        const quads = pointToHilbertQuadList(this.ij[0], this.ij[1], this.level, this.face);
        return `${this.face}/${quads.join('')}`;
    }
    // return an array of 4 S2 Cells representing the neighbors of the S2 Cell
    getNeighbors() {
        const fromFaceIJWrap = (face, ij, level) => {
            const maxSize = (1 << level);
            if (ij[0] >= 0 && ij[1] >= 0 && ij[0] < maxSize && ij[1] < maxSize) {
                return S2Cell.FromFaceIJ(face, ij, level);
            } else {
                const st = IJToST(ij, level, [0.5, 0.5]);
                const uv = STToUV(st);
                const xyz = FaceUVToXYZ(face, uv);
                const faceuv = XYZToFaceUV(xyz);
                face = faceuv[0];
                uv = faceuv[1];
                const stNew = UVToST(uv);
                ij = STToIJ(stNew, level);
                return S2Cell.FromFaceIJ(face, ij, level);
            }
        };

        const face = this.face;
        const i = this.ij[0];
        const j = this.ij[1];
        const level = this.level;

        return [
            fromFaceIJWrap(face, [i - 1, j], level),
            fromFaceIJWrap(face, [i, j - 1], level),
            fromFaceIJWrap(face, [i + 1, j], level),
            fromFaceIJWrap(face, [i, j + 1], level)
        ];
    }
}

export { S2Cell };


