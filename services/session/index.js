'use strict';

const fp = require('fastify-plugin');
const Sequelize = require('sequelize');
const {
  create: createSessionSchema
} = require('./schemas');
const {
  definition
} = require('./model');

async function routes(fastify, options) {
  fastify.register(require('fastify-sequelize'), {
    instance: 'database',
    host: 'localhost',
    database: 'tywin',
    username: 'root',
    password: 'cvY7NoQqTj2jg',
    dialect: 'mysql',
    operatorsAliases: Sequelize.Op, // use Sequelize.Op
    pool: {
      max: 5,
      min: 0,
      idle: 10000
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

module.exports = routes;
