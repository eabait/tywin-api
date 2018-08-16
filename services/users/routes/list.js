'use strict';

module.exports = function(fastify, options, next) {
  fastify.get('/users', async function(req, reply) {
    const repository = fastify.userRepository;
    const users = await repository.findAll();
    return users;
  });
  next();
};
