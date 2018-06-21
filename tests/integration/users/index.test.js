/* eslint-env node, mocha */
'use strict';

const assert = require('assert');
const Fastify = require('fastify');
const fp = require('fastify-plugin');
const UsersService = require('../../../services/users');

let fastify;

describe('Users', () => {

  before('create fastify instance', (done) => {
    fastify = Fastify({ level: 'silent' });
    fastify.register(fp(UsersService));
    fastify.ready(done);
  });

  after('destroy fastify', done => {
    if (!fastify) return done();
    fastify.close(done);
  });

  it('Response is successful', () => {
    fastify.inject({
      method: 'GET',
      url: '/users'
    }, (err, response) => {
      assert.ifError(err);
      assert.equal(200, response.statusCode);
      assert.equal('{"hello":"world"}', response.payload);
    });
  });
});
