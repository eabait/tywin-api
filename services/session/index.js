'use strict';

const fp = require('fastify-plugin');
const {
  create: createSessionSchema
} = require('./schemas');
const SessionModel = require('./data/model');
const SessionEntity = require('./entities/session');
const UserModel = require('../users/data/model');

const SessionSequelizeRepository = require('./data/sequelizeRepository');
const SessionMapper = require('./data/mapper');

const UserRepository = require('../users/data/sequelizeRepository');
const UserMapper = require('../users/data/mapper');
const { mapValidationErrors } = require('../../exceptions/errorFactory');

module.exports = async function(fastify, options) {

  fastify.register(fp(async function setupRepositories(fastify) {
    const user = UserModel(fastify.database);
    const session = SessionModel(fastify.database, user);

    const userSequelizeRepository = new UserRepository(
      user, UserMapper, mapValidationErrors
    );
    const sessionSequelizeRepository = new SessionSequelizeRepository(
      session, SessionMapper, mapValidationErrors, user
    );
    fastify.decorate(
      'sessionRepository',
      sessionSequelizeRepository
    );
    fastify.decorate(
      'userRepository',
      userSequelizeRepository
    );
  }));

  fastify.register(registerRoutes);

};

async function registerRoutes(fastify, options) {
  fastify.post('/session', createSessionSchema, async(request, reply) => {
    const {
      email,
      password
    } = request.body;
    const user = await fastify.userRepository.findByEmail(email);
    const validPassword = await user.comparePasswords(password);

    if (validPassword) {
      const session = new SessionEntity({
        accessToken: 2,
        accessTokenTtl: new Date(),
        refreshToken: 3,
        refreshTokenTtl: new Date(),
        user
      });
      fastify
        .sessionRepository
        .create(session)
        .then(newSession => {
          reply.send(newSession);
        });
    } else {
      reply.code(401).send({
        message: 'Invalid password'
      });
    }
  });

  fastify.get('/session', async function(req, reply) {
    const repository = fastify.sessionRepository;
    repository
      .findAll()
      .then(sessions => {
        reply.send(sessions);
      });
  });
}
