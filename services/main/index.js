async function routes (fastify, options) {
  fastify.get('/', async (request, reply) => {
    reply
      .send({
        hello: 'world'
      });
  });
}

module.exports = routes;
