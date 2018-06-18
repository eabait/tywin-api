'use strict';

const { attributes } = require('structure');

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
  role: {
    type: Array,
    itemType: String,
    default: ['USER']
  }
})(class User {
  fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
});

module.exports = User;
