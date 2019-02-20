/* eslint-env node, mocha */
'use strict';

const assert = require('assert');
const { expect } = require('chai');
const { mapValidationErrors } = require('../../../src/exceptions/errorFactory');

describe('mapValidationErrors', () => {

  it(`returns a ValidationError from an array
    of data-validation-errors`, () => {
    const validationError = mapValidationErrors([
      {
        message: 'mocked item error 1',
        path: 'error 1',
        value: '1'
      },
      {
        message: 'mocked item error 2',
        path: 'error 2',
        value: '2'
      },
      {
        message: 'mocked item error 3',
        path: 'error 3',
        value: '3'
      }
    ]);
    expect(validationError.details).to.be.an('array');
  });

  it('throws an AssertionError if falsy value is passed as argument', () => {
    expect(() => mapValidationErrors()).to.throw(assert.AssertionError);
  });

  it('works even if passed validations are empty array', () => {
    expect(() => mapValidationErrors([])).to.not.throw();
  });
});
