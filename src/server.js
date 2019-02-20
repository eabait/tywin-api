'use strict';

require('make-promises-safe');
const path = require('path');
const AutoLoad = require('fastify-autoload');
const loadCommonServiceSchemas = require('./common/servicesSchemas');

module.exports = function(fastify, options, next) {

  const { envPath } = options;

  fastify.use(require('cors')());

  fastify.setErrorHandler(require('./exceptions/errorHandler'));

  fastify.register(require('fastify-env'), {
    schema: require('./common/envSchemas'),
    dotenv: {
      path: envPath || `${__dirname}/.env`
    }
  });

  loadCommonServiceSchemas(fastify);

  fastify.register(async function(fastify) {

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins')
    });

    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'services')
    });

    fastify.register(async function(fastify) {
      try {
        await fastify.database.authenticate();
        fastify.logger.debug(
          `Successfuly connected to ${fastify.config.DATABASE}`
        );
      } catch (error) {
        fastify.logger.error(
          'Cannot connect to database',
          fastify.config.DATABASE,
          error
        );
        next();
      };
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
