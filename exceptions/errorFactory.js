'use strict';

const assert = require('assert');

module.exports = {

  /**
   * Maps data layer errors to domain errors
   * @param {Array} list of validations that failed
   * @returns {Error} an error object
   */
  mapValidationErrors(validationErrors) {
    const error = new Error('ValidationError');

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
    return error;
  }

};
