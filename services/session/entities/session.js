'use strict';

const { attributes } = require('structure');
const UserEntity = require('../../users/entities/user');

const Session = attributes({
  id: Number,
  accessToken: String,
  accessTokenTtl: Date,
  refreshToken: String,
  refreshTokenTtl: Date,
  user: UserEntity
})(class Session {
});

module.exports = Session;
