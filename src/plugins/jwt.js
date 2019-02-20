'use strict';

const fp = require('fastify-plugin');

module.exports = fp(function(fastify, options, next) {

  fastify.register(require('fastify-jwt'), {
    secret: fastify.config.JWT_SECRET,
    algorithms: ['RS256']
  });

  /**
   * Verifies the JWT token. Stores the decoded value in the request object.
   */
  fastify.decorate('authenticate', async function(request, reply) {
    try {
      const user = await request.jwtVerify();
      if (!fastify.hasRequestDecorator('user')) {
        fastify.decorateRequest('user', user);
      } else {
        request.user = user;
      }
    } catch (error) {
      request.log.error(
        'There has been an error verifying the request jwt',
        error
      );
      reply
        .code(401)
        .send(error);
    }
  });

  next();

});
