'use strict';

async function routes(fastify, options) {
  fastify.get('/users', async(request, reply) => {
    reply
      .send({
        hello: 'world'
      });
  });
}

module.exports = routes;
