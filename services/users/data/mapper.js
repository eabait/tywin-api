'use strict';

const UserEntity = require('../entities/user');

const UserMapper = {

  toEntity(sequelizeModel) {
    return new UserEntity(sequelizeModel.get({
      plain: true
    }));
  },

  toDatabase(entity) {
    return entity;
  }
};

module.exports = UserMapper;
