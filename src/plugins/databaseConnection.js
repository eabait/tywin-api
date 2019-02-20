'use strict';

const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

module.exports = fp(function(fastify, options, next) {

  fastify.register(require('fastify-sequelize'), {
    instance: 'database',
    host: fastify.config.DATABASE_HOST,
    database: fastify.config.DATABASE,
    username: fastify.config.DATABASE_USER,
    password: fastify.config.DATABASE_PASSWORD,
    dialect: fastify.config.DATABASE_DIALECT,
    operatorsAliases: Sequelize.Op,
    pool: {
      max: fastify.config.DATABASE_POOL_MAX,
      min: fastify.config.DATABASE_POOL_MIN,
      idle: fastify.config.DATABASE_POOL_IDLE
    }
  });

  next();
});
