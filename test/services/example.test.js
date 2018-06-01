'use strict'

const { test } = require('tap');
const Fastify = require('fastify');
const App = require('../../app');

test('example is loaded', async (t) => {
  const fastify = Fastify();

  fastify.register(App);

  const res = await fastify.inject({
    url: '/example'
  });

  t.equal(res.payload, 'this is an example');
});
