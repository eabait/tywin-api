'use strict';

const { attributes } = require('structure');
const bcrypt = require('bcrypt');
const { PASSWORD_SALT } = require('../../../config/index.js');

const User = attributes({
  id: Number,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    email: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    itemType: String,
    default: ['USER']
  }
})(class User {

  static async getEncryptedPassword(plainPassword) {
    const hashedPassword = await bcrypt.hash(
      plainPassword,
      PASSWORD_SALT
    );
    return hashedPassword;
  }

  async comparePasswords(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  }
});

module.exports = User;
