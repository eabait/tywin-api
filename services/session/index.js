const fsequelize = require('fastify-sequelize');
const Sequelize = require('sequelize');

async function routes (fastify, options) {
  fastify.register(fsequelize, {
    instance: 'database',
    host: 'localhost',
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
  })

  fastify.post('/session', async (request, reply) => {
    reply
      .send({
        new: 'session'
      });
  });

  fastify.delete('/session', async function (req, reply) {
    reply.send({})
  });
}

module.exports = routes;
