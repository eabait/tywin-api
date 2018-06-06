'use strict';

const Sequelize = require('sequelize');

const definition = (database) => {
  return database.define('session', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    accessToken: Sequelize.STRING,
    accessTokenTtl: Sequelize.DATE,
    refreshToken: Sequelize.STRING,
    refreshTokenTtl: Sequelize.DATE
  });
};

module.exports = {
  definition
};
