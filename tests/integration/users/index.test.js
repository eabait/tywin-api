/* eslint-env node, mocha */
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../../../server');

const { expect } = chai;
chai.use(chaiHttp);

describe('Users', () => {

  let fastify;

  before('Bootstrap User service', (done) => {
    fastify = Fastify({ level: 'info' });
    fastify
      .register(fp(App), {
        envPath: `${__dirname}/../../.env`
      })
      .ready(done);
  });

  after('Destroy User service', done => {
    if (!fastify) return done();
    fastify.close(() => {
      done();
    });
  });

  it('sends a valid JSON response', done => {
    chai
      .request(fastify.server)
      .get('/users')
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', /application\/json/);
        expect(response).to.be.json;
        done();
      });
  });
});
