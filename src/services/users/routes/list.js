'use strict';

const { list } = require('../schemas');

module.exports = function(fastify, options, next) {

  fastify.get('/users', { schema: list }, handler);

  async function handler(request, reply) {
    request.log.debug('Route - List Users');

    const {
      userRepository
    } = fastify;
    try {
      const users = await userRepository.findAll();
      reply
        .code(200)
        .send(users);
    } catch (errors) {
      request.log.error('Route - List Users - Error', errors);
      reply
        .code(500)
        .send({
          errors
        });
    }
  }

  next();
};
