'use strict';

const fp = require('fastify-plugin');
const {
  create: createUserSchema
} = require('./schemas');
const SessionModel = require('../session/data/model');
const UserEntity = require('./entities/user');
const UserModel = require('../users/data/model');
const UserSequelizeRepository = require('./data/sequelizeRepository');
const UserMapper = require('./data/mapper');
const { mapValidationErrors } = require('../../exceptions/errorFactory');

module.exports = async function(fastify, options) {

  fastify.register(fp(async function setupRepositories(fastify) {
    const session = SessionModel(fastify.database);
    const user = UserModel(fastify.database, session);
    const userSequelizeRepository = new UserSequelizeRepository(
      user, UserMapper, mapValidationErrors
    );
    fastify.decorate(
      'userRepository',
      userSequelizeRepository
    );
  }));

  fastify.register(registerRoutes);

};

async function registerRoutes(fastify, options) {
  fastify.post('/users', createUserSchema, async(request, reply) => {
    const repository = fastify.userRepository;
    const {
      firstName,
      lastName,
      email,
      password,
      roles
    } = request.body;
    const hashedPassword = await UserEntity.getEncryptedPassword(password);
    const user = new UserEntity({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      roles
    });
    try {
      const newUser = await repository.create(user);
      reply.send(newUser);
    } catch (errors) {
      reply
        .code(400)
        .send(errors);
    }
  });

  fastify.get('/users', async function(req, reply) {
    const repository = fastify.userRepository;
    repository
      .findAll()
      .then(users => {
        reply.send(users);
      });
  });
}
