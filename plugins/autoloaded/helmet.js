'use strict';

const fp = require('fastify-plugin');
const helmet = require('fastify-helmet');

module.exports = fp(function(fastify, options, next) {

  fastify.register(
    helmet
  );

  next();

});
