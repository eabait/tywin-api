'use strict';

const UserEntity = require('../entities/user');

const UserMapper = {

  toEntity(sequelizeModel) {
    if (sequelizeModel != null) {
      return new UserEntity(sequelizeModel.get({
        plain: true
      }));
    } else {
      return null;
    }
  },

  toDatabase(entity) {
    return {
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      password: entity.password
    };
  }
};

module.exports = UserMapper;
