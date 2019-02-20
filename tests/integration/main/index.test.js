/* eslint-env node, mocha */
'use strict';

const assert = require('assert');
const Fastify = require('fastify');
const fp = require('fastify-plugin');
const MainService = require('../../../src/services/main');

let fastify;

describe('Main', () => {

  before('create fastify instance', (done) => {
    fastify = Fastify({ level: 'silent' });
    fastify.register(fp(MainService));
    fastify.ready(done);
  });

  after('destroy fastify', done => {
    if (!fastify) return done();
    fastify.close(done);
  });

  it('Response is successful', () => {
    fastify.inject({
      method: 'GET',
      url: '/'
    }, (err, response) => {
      assert.ifError(err);
      assert.equal(200, response.statusCode);
      assert.equal('{"hello":"world"}', response.payload);
    });
  });
});
