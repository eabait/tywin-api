'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, options, next) {

  const { envPath } = options;

  fastify.register(require('fastify-env'), {
    schema: {
      ...require('./config/database.schema')
    },
    dotenv: {
      path: envPath || `${__dirname}/.env`
    }
  });

  fastify.register(async function(fastify) {

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins/autoloaded')
    });

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'services')
    });

    fastify.register(function(fastify, options, next) {
      fastify
        .database
        .authenticate()
        .then(() => {
          fastify.logger.info(`Successfuly connected to ${fastify.config.DATABASE}`);
          fastify.database.sync();
          next();
        })
        .catch(error => {
          fastify.logger.error('Cannot connect to database', error);
          next();
        });
    });

  });

  next();

};
