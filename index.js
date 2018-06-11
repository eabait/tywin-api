'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, opts, next) {

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services')
  });

  // Make sure to call next when done
  next();

};
