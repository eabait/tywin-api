'use strict';

const {
  create
} = require('../schemas');

module.exports = function(fastify, options, next) {

  fastify.post('/session', { schema: create }, handler);

  async function handler(request, reply) {
    request.log.debug('Route - Session - Create', request.body);

    const {
      userRepository,
      jwt,
      config
    } = fastify;
    const {
      email,
      password
    } = request.body;

    try {
      const user = await userRepository.findByEmail(email);

      if (user == null) {
        request.log.debug(
          'Route - Session - Create - User not found'
        );
        reply
          .code(404)
          .send({
            errors: [{
              message: `User with email ${email} not found`,
              code: 'ResourceNotFound'
            }]
          });
      } else {
        request.log.info('Creating JWT from ', user);

        const isValidPassword = await user.comparePasswords(password);
        if (isValidPassword) {
          const expiryTime = Math.floor(Date.now() / 1000)
            + (60 * config.JWT_EXPIRY_TIME);
          const token = jwt.sign({
            user,
            exp: expiryTime
          });
          request.log.debug('Route - Session - Create - token', token);
          reply.send({
            token
          });
        } else {
          request.log.debug('Route - Session - Create - Invalid credentials');
          reply
            .code(400)
            .send({
              errors: [{
                message: 'Credentials are invalid',
                code: 'InvalidCredentials'
              }]
            });
        }
      }
    } catch (error) {
      request.log.error('Route - Session - Create - Error', error);
      reply
        .code(500)
        .send(error);
    }
  }

  next();
};

