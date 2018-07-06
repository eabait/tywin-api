'use strict';

const Sequelize = require('sequelize');

module.exports = (database, userModel) => {
  const sessionModel = database.define(
    'session',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      accessToken: Sequelize.STRING,
      accessTokenTtl: Sequelize.DATE,
      refreshToken: Sequelize.STRING,
      refreshTokenTtl: Sequelize.DATE
    },
    {
      underscored: true
    }
  );
  sessionModel.belongsTo(userModel);
  return sessionModel;
};

