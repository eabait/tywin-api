'use strict';

const create = {
  description: 'Creates a user.',

  headers: {
    type: 'object',
    properties: {
      Accept: {
        type: 'string'
      },
      'Content-Type': {
        type: 'string'
      }
    },
    required: ['Content-Type']
  },

  body: {
    type: 'object',
    properties: {
      firstName: {
        type: 'string'
      },
      lastName: {
        type: 'string'
      },
      email: {
        type: 'string',
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 8
      }
    }
  },
  required: ['email', 'password']
};

module.exports = {
  create
};
