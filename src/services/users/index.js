'use strict';

const userPlugins = require('./plugins');

module.exports = async function(fastify) {

  fastify.register(userPlugins);
  fastify.register(registerRoutes);

};

async function registerRoutes(fastify) {
  fastify.register(require('./routes/create'), { logLevel: 'debug' });
  fastify.register(require('./routes/list'), { logLevel: 'debug' });
}
