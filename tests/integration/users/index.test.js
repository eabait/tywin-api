/* eslint-env node, mocha */
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../../../server');
const UserSeeder = require('./userSeeder');

const { expect } = chai;
chai.use(chaiHttp);

describe('Users', () => {

  let fastify;
  let userSeeder;

  before('Load User service', done => {
    fastify = Fastify({ level: 'info' });
    fastify
      .register(fp(App), {
        envPath: `${__dirname}/../../.test.env`
      })
      .ready(() => {
        userSeeder = new UserSeeder(fastify.config);
        done();
      });
  });

  after('Destroy User service', done => {
    if (!fastify) {
      done();
    }
    userSeeder.close().then(() => {
      fastify.close(() => {
        done();
      });
    });
  });

  beforeEach(async() => {
    console.log('******** BEFOREEACH');
    await userSeeder.createSeeds();
  });

  afterEach(async() => {
    console.log('******** AFTEREACH');
    await userSeeder.destroySeeds();
  });

  it('sends a valid JSON response', done => {
    chai
      .request(fastify.server)
      .get('/users')
      .then(response => {
        expect(response).to.have.status(200);
        expect(response).to.have.header('content-type', /application\/json/);
        expect(response).to.be.json;
        done();
      })
      .catch(error => expect(error).to.be.null);
  });

  it('creates a user', done => {
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN'
    };
    chai
      .request(fastify.server)
      .post('/users')
      .send(newUser)
      .then(response => {
        const responseBody = response.body;

        expect(responseBody.id).not.to.be.null;
        expect(responseBody.firstName).equal(newUser.firstName);
        expect(responseBody.lastName).equal(newUser.lastName);
        expect(responseBody.email).equal(newUser.email);
        expect(responseBody.role).equal(newUser.role);
        expect(responseBody.password).not.equal(newUser.password);

        done();
      })
      .catch(error => expect(error).to.be.null);
  });
});
