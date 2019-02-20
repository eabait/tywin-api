'use strict';

const assert = require('assert');
const ValidationError = require('./validationError');

module.exports = {

  /**
   * Maps data layer errors to domain errors
   * @param {Array} list of validations that failed
   * @returns {Error} an error object
   */
  mapValidationErrors(validationErrors) {
    const error = new ValidationError();

    assert(
      validationErrors != null && Array.isArray(validationErrors),
      `mapValidationErrors expects an array of error items.
      Instead got ${validationErrors}`
    );

    error.details = validationErrors.map(errorItem => {
      return {
        message: errorItem.message,
        value: errorItem.value,
        path: errorItem.path
      };
    });
    error.status = 400;
    return error;
  },

  mapNotFoundError(message) {
    const error = new ValidationError();

    error.details = [{
      message: message,
      code: 'RegistryNotFound'
    }];
    error.status = 404;

    return error;
  }

};
