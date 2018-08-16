'use strict';

const fp = require('fastify-plugin');

const UserModel = require('../users/data/model');
const UserSequelizeRepository = require('./data/sequelizeRepository');
const UserMapper = require('./data/mapper');
const { mapValidationErrors } = require('../../exceptions/errorFactory');

module.exports = async function(fastify) {

  fastify.register(fp(async function setupRepositories(fastify) {
    const user = UserModel(fastify.database);
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

async function registerRoutes(fastify) {
  fastify.register(require('./routes/create'), { logLevel: 'debug' });
  fastify.register(require('./routes/list'), { logLevel: 'debug' });
}
