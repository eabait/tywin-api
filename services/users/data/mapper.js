'use strict';

const UserEntity = require('../entities/user');

const UserMapper = {

  toEntity(sequelizeModel) {
    return new UserEntity(sequelizeModel.get({
      plain: true
    }));
  },

  toDatabase(entity) {
    return {
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      password: entity.password,
      role: entity.role
    };
  }
};

module.exports = UserMapper;
