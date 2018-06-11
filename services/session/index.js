'use strict';

const fp = require('fastify-plugin');
const {
  create: createSessionSchema
} = require('./schemas');
const {
  definition
} = require('./model');

module.exports = async function(fastify, options) {

  fastify.register(require('fastify-env'), {
    schema: {
      ...require('../../config/database.schema')
    },
    dotenv: {
      path: `${__dirname}/.env`
    }
  });

  fastify.register(async function(fastify) {

    fastify.register(
      require('../../plugins/databaseConnection'),
      fastify.config
    );

    fastify.register(fp(async function decorateWithSessionModel(fastify) {
      const session = definition(fastify.database);
      session.sync();
      fastify.decorate('sessionModel', session);
    }));

    fastify.register(registerRoutes);

  });
};

async function registerRoutes(fastify, options) {
  fastify.post('/session', createSessionSchema, async(request, reply) => {
    // const {
    //   email,
    //   password
    // } = request.body;
    fastify.sessionModel.create({
      accessToken: '1',
      refreshToken: '2',
      accessTokenTtl: new Date(),
      refreshTokenTtl: new Date()
    })
      .then(session => {
        reply.send(session);
      });
  });

  fastify.delete('/session', async function(req, reply) {
    reply.send({});
  });
}
