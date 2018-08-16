'use strict';

module.exports = function(fastify, options, next) {
  fastify.get('/users', async function(req, reply) {
    const repository = fastify.userRepository;
    repository
      .findAll()
      .then(users => {
        reply.send(users);
      });
  });
  next();
};
