'use strict';

const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

module.exports = fp(function(fastify, options, next) {

  fastify.register(require('fastify-sequelize'), {
    instance: 'database',
    host: options.DATABASE_HOST,
    database: options.DATABASE,
    username: options.DATABASE_USER,
    password: options.DATABASE_PASSWORD,
    dialect: options.DATABASE_DIALECT,
    operatorsAliases: Sequelize.Op,
    pool: {
      max: options.DATABASE_POOL_MAX,
      min: options.DATABASE_POOL_MIN,
      idle: options.DATABASE_POOL_IDLE
    }
  })
    .ready(() => {
      fastify
        .database
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        })
        .catch(error => {
          console.log('Cannot connect to database', error);
        });
    });

  next();
});
