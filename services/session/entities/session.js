'use strict';

const { attributes } = require('structure');

const Session = attributes({
  id: Number,
  accessToken: String,
  accessTokenTtl: Date,
  refreshToken: String,
  refreshTokenTtl: Date
})(class Session {
});

module.exports = Session;
