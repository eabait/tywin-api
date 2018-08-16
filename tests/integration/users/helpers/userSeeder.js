'use strict';

const fixture = require('./fixture');
const Sequelize = require('sequelize');
const User = require('../../../../services/users/data/model');

class UserSeeder {
  constructor(config) {
    this.database = new Sequelize(
      config.DATABASE,
      config.DATABASE_USER,
      config.DATABASE_PASSWORD, {
        host: config.DATABASE_HOST,
        dialect: 'mysql',
        operatorsAliases: false
      }
    );
    this.userDao = User(this.database);
  }

  close() {
    return this.database.close();
  }

  createSeeds() {
    return Promise.all(fixture.map(user => {
      return this.userDao.create(user);
    }));
  }

  async destroySeeds() {
    try {
      return await this.database.query('DELETE FROM users');
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = UserSeeder;
