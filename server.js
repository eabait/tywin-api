'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');

module.exports = function(fastify, options, next) {

  const { envPath } = options;

  fastify.setErrorHandler((error, request, reply) => {
    reply.send({
      errors: error.details
    });
  });

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
      try {
        await fastify.database.authenticate();
      } catch (error) {
        fastify.logger.error(
          'Cannot connect to database',
          fastify.config.DATABASE,
          error
        );
        next();
      };
      fastify.logger.debug(
        `Successfuly connected to ${fastify.config.DATABASE}`
      );
      try {
        await fastify.database.sync();
      } catch (error) {
        fastify.logger.error(
          'There has been an error synching the database',
          fastify.config.DATABASE,
          error
        );
      };
    });

  });

  next();

};
