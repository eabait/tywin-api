'use strict';

module.exports = (error, request, reply) => {
  if (Array.isArray(error.details) && error.details.length > 0) {
    reply.send({
      status: error.status,
      errors: error.details
    });
  } else {
    reply.send({
      errors: [
        {
          message: error.message || error
        }
      ]
    });
  }
};
