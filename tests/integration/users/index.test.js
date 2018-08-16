/* eslint-env node, mocha */
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const Fastify = require('fastify');
const fp = require('fastify-plugin');
const App = require('../../../server');
const UserSeeder = require('./helpers/userSeeder');

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
    await userSeeder.createSeeds();
  });

  afterEach(async() => {
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

  it('lists the correct number of users', done => {
    chai
      .request(fastify.server)
      .get('/users')
      .then(response => {
        expect(response.body).to.have.length(3);
        done();
      })
      .catch(error => expect(error).to.be.null);
  });

  it('creates a user', done => {
    const newUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password()
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

  it('returns detailed errors if validation fails', done => {
    const newUser = {
      firstName: ''
    };
    chai
      .request(fastify.server)
      .post('/users')
      .send(newUser)
      .then(response => {
        expect(response).to.have.status(400);
        done();
      })
      .catch(error => {
        throw error;
      });
  });
});
