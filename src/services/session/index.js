'use strict';

const UserPlugins = require('../users/plugins');

module.exports = async function(fastify, options) {
  fastify.register(UserPlugins);
  fastify.register(registerRoutes);
};

async function registerRoutes(fastify) {
  fastify.register(require('./routes/create'), { logLevel: 'debug' });
}
