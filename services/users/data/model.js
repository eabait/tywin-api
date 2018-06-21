'use strict';

const Sequelize = require('sequelize');

module.exports = (database, SessionModel) => {
  const UserModel = database.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      roles: {
        type: Sequelize.ENUM('ADMIN', 'USER'),
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  UserModel.hasMany(SessionModel, {
    as: 'User'
  });

  return UserModel;
};
