'use strict';

const fp = require('fastify-plugin');
const Sequelize = require('sequelize');
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

  fastify.register(async function(fastify, opts) {

    console.log(fastify.config);

    fastify.register(require('fastify-sequelize'), {
      instance: 'database',
      host: fastify.config.DATABASE_HOST,
      database: fastify.config.DATABASE,
      username: fastify.config.DATABASE_USER,
      password: fastify.config.DATABASE_PASSWORD,
      dialect: fastify.config.DATABASE_DIALECT,
      operatorsAliases: Sequelize.Op,
      pool: {
        max: fastify.config.DATABASE_POOL_MAX,
        min: fastify.config.DATABASE_POOL_MIN,
        idle: fastify.config.DATABASE_POOL_IDLE
      }
    })
      .ready(() => {
        fastify
          .database
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
          });
      });

    fastify.register(fp(async function decorateWithSessionModel(fastify, opts) {
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
