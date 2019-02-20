'use strict';

module.exports = {
  type: 'object',
  required: [
    'DATABASE_DIALECT',
    'DATABASE',
    'DATABASE_HOST',
    'DATABASE_USER',
    'DATABASE_PASSWORD',
    'DATABASE_POOL_MIN',
    'DATABASE_POOL_MAX',
    'DATABASE_POOL_IDLE',
    'JWT_SECRET',
    'JWT_EXPIRY_TIME'
  ],
  properties: {
    DATABASE_DIALECT: { type: 'string', default: 'mysql' },
    DATABASE: { type: 'string', default: 'tywin' },
    DATABASE_HOST: { type: 'string', default: 'localhost' },
    DATABASE_USER: { type: 'string', default: 'root' },
    DATABASE_PASSWORD: { type: 'string', default: 'changeme!' },
    DATABASE_POOL_MIN: { type: 'integer', default: '0' },
    DATABASE_POOL_MAX: { type: 'integer', default: '5' },
    DATABASE_POOL_IDLE: { type: 'integer', default: '10000' },
    JWT_SECRET: { type: 'string' },
    JWT_EXPIRY_TIME: { type: 'number' }
  }
};
