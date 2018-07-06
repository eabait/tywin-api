'use strict';

const fp = require('fastify-plugin');
const Sequelize = require('sequelize');

module.exports = fp(function(fastify, options, next) {

  fastify.register(require('fastify-sequelize'), {
    instance: 'database',
    host: 'localhost',
    database: 'tywin-test',
    username: 'root',
    password: 'cvY7NoQqTj2jg',
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,
      min: 0,
      idle: 10
    }
  });

  next();
});

