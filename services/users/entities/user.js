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
  }
})(class User {

  async getEncryptedPassword() {
    const hashedPassword = await bcrypt.hash(
      this.password,
      PASSWORD_SALT
    );
    return hashedPassword;
  }

  async comparePasswords(plainTextPassword) {
    return await bcrypt.compare(plainTextPassword, this.password);
  }
});

module.exports = User;
