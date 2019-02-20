'use strict';

const fp = require('fastify-plugin');
const pino = require('pino');

module.exports = fp(function(fastify, options, next) {

  const logger = pino();

  fastify.decorate(
    'logger',
    logger
  );

  next();

});
