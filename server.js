'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, options, next) {

  const envPath = options.envPath;
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

    fastify.register(async function(fastify) {
      fastify
        .database
        .authenticate()
        .then(() => {
          fastify.logger.info('Successful database connection.');
          fastify.database.sync();
        })
        .catch(error => {
          fastify.logger.error('Cannot connect to database', error);
        });
    });

  });

  next();

};
