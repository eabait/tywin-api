'use strict';

const UserMapper = require('./mapper');

class UserRepository {

  constructor(userModel) {
    this.userModel = userModel;
  }

  findByEmail(email) {
    const model = this.userModel.findOne({
      where: {
        email
      }
    });
    return UserMapper.toEntity(model);
  }

}

module.exports = UserRepository;
