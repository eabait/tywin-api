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
    const session = SessionModel(fastify.database);
    const user = UserModel(fastify.database, session);
    const userRepository = new UserRepository(
      user, UserMapper, mapValidationErrors
    );
    const sessionSequelizeRepository = new SessionSequelizeRepository(
      session, SessionMapper, mapValidationErrors, userRepository
    );
    fastify.decorate(
      'sessionSequelizeRepository',
      sessionSequelizeRepository
    );
  }));

  fastify.register(registerRoutes);

};

async function registerRoutes(fastify, options) {
  fastify.post('/session', createSessionSchema, async(request, reply) => {
    const repository = fastify.sessionSequelizeRepository;
    // const {
    //   email,
    //   password
    // } = request.body;
    const session = new SessionEntity({
      accessToken: 2,
      accessTokenTtl: new Date(),
      refreshToken: 3,
      refreshTokenTtl: new Date()
    });
    repository
      .create(session)
      .then(newSession => {
        reply.send(newSession);
      });
  });

  fastify.get('/session', async function(req, reply) {
    const repository = fastify.sessionSequelizeRepository;
    repository
      .findAll()
      .then(sessions => {
        reply.send(sessions);
      });
  });
}
