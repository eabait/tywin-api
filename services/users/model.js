'use strict';

const Sequelize = require('sequelize');

const UserModel = Sequelize.define('users', {
  accessToken: Sequelize.STRING,
  accessTokenTtl: Sequelize.DATE,
  refreshToken: Sequelize.STRING,
  refreshTokenTtl: Sequelize.DATE
});

module.exports = UserModel;
