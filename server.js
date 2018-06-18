'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, opts, next) {

  fastify.register(require('fastify-env'), {
    schema: {
      ...require('./config/database.schema')
    },
    dotenv: {
      path: `${__dirname}/.env`
    }
  });

  fastify.register(async function(fastify) {

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins/autoloaded')
    });

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'services')
    });

    fastify.register(async function(fastify) {
      fastify.database.sync();
    });

  });

  next();

};
