'use strict';

const {
  create: createUserSchema
} = require('../schemas');
const UserEntity = require('../entities/user');

module.exports = function(fastify, options, next) {
  fastify.post(
    '/users',
    createUserSchema,
    async function(request, reply) {
      const repository = fastify.userRepository;
      const {
        firstName,
        lastName,
        email,
        password,
        role
      } = request.body;

      const user = new UserEntity({
        firstName,
        lastName,
        email,
        password: password,
        role
      });
      try {
        const newUser = await repository.create(user);
        reply.send(newUser);
      } catch (errors) {
        reply
          .code(400)
          .send(errors);
      }
    }
  );
  next();
};

