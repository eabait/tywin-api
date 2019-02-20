'use strict';

module.exports = function(fastify) {

  fastify.addSchema({
    $id: 'error',
    type: 'object',
    properties: {
      status: { type: 'string' },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            message: {
              type: 'string'
            }
          }
        }
      }
    }
  });

  fastify.addSchema({
    $id: 'user',
    type: 'object',
    properties: {
      id: { type: 'number' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' }
    }
  });
};
