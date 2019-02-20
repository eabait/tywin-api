'use strict';

const create = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 8
      }
    },
    required: ['email', 'password']
  }
};

module.exports = {
  create
};
