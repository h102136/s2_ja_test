'use strict';

export const pointToHilbertQuadList = (x, y, order, face) => {
  const hilbertMap = {
    'a': [ [0,'d'], [1,'a'], [3,'b'], [2,'a'] ],
    'b': [ [2,'b'], [1,'b'], [3,'a'], [0,'c'] ],
    'c': [ [2,'c'], [3,'d'], [1,'c'], [0,'b'] ],
    'd': [ [0,'a'], [3,'c'], [1,'d'], [2,'d'] ]
  };

  if (typeof face !== 'number') {
    console.warn(new Error("called pointToHilbertQuadList without face value, defaulting to '0'").stack);
  }
  let currentSquare = (face % 2) ? 'd' : 'a';
  const positions = [];

  for (let i = order - 1; i >= 0; i--) {
    const mask = 1 << i;

    const quad_x = x & mask ? 1 : 0;
    const quad_y = y & mask ? 1 : 0;

    const t = hilbertMap[currentSquare][quad_x * 2 + quad_y];

    positions.push(t[0]);

    currentSquare = t[1];
  }

  return positions;
};