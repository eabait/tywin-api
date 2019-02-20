'use strict';

const {
  create
} = require('../schemas');
const UserEntity = require('../entities/user');

module.exports = function(fastify, options, next) {
  fastify.post(
    '/users',
    {
      schema: create
    },
    handler
  );
  async function handler(request, reply) {
    request.log.debug(
      'Route - Create User',
      request.body
    );
    const {
      userRepository
    } = fastify;
    const {
      firstName,
      lastName,
      email,
      password
    } = request.body;

    const user = new UserEntity({
      firstName,
      lastName,
      email,
      password: password
    });
    try {
      const newUser = await userRepository.create(user);
      reply.send(newUser);
    } catch (errors) {
      request.log.error('Route - Create User - Error', errors);
      reply
        .code(400)
        .send(errors);
    }
  }

  next();
};

