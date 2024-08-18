'use strict';

import { expect } from 'chai';
import sinon from 'sinon'; // monitor and simulate behavior of functions
import { pointToHilbertQuadList } from '../src/HilbertCurve.js';

// 
describe('pointToHilbertQuadList', () => {
  it('should return correct positions [0, 0] for x=0, y=0, order=2, face=0', () => {
    const result = pointToHilbertQuadList(0, 0, 2, 0);
    expect(result).to.deep.equal([0, 0]);
  });

  it('should return correct positions [3, 1] for x=1, y=2, order=2, face=1', () => {
    const result = pointToHilbertQuadList(1, 2, 2, 1);
    expect(result).to.deep.equal([3, 1]);
  });

  it('should log a warning and default face to 0 when face is not a number and return correct positions [2, 0]', () => {
    const consoleWarnStub = sinon.stub(console, 'warn'); // monitor console.warn
    const result = pointToHilbertQuadList(2, 2, 2, 'notANumber'); // face is not a number, so it defaults to 0
    // pointToHilbertQuadList(2, 2, 2, 0) as face is not a number
    expect(consoleWarnStub.calledOnce).to.be.true;
    expect(result).to.deep.equal([2, 0]);

    // restore the console.warn function
    consoleWarnStub.restore();
  });
});
