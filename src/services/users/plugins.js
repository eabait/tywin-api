'use strict';

const fp = require('fastify-plugin');

const UserSequelizeModel = require('./data/userSequelizeModel');
const UserSequelizeRepository = require('./data/userSequelizeRepository');
const UserSequelizeMapper = require('./data/userSequelizeMapper');
const { mapValidationErrors } = require('../../exceptions/errorFactory');

module.exports = fp(function(fastify, options, next) {

  const userSequelizeModel = UserSequelizeModel(fastify.database);
  const userSequelizeRepository = new UserSequelizeRepository(
    userSequelizeModel,
    UserSequelizeMapper,
    mapValidationErrors
  );
  fastify.decorate(
    'userRepository',
    userSequelizeRepository
  );

  next();

});
