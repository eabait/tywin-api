'use strict';

const create = {
  body: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        required: true
      },
      lastName: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        format: 'email',
        required: true
      },
      password: {
        type: 'string',
        minLength: 8,
        required: true
      }
    }
  }
};

module.exports = {
  create
};
