'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, opts, next) {

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins/autoloaded')
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services')
  });

  next();

};
