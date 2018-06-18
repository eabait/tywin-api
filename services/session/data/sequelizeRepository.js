'use strict';

const SessionMapper = require('./mapper');

class SessionRepository {

  constructor(sessionModel, userRepository) {
    this.sessionModel = sessionModel;
    this.userRepository = userRepository;
  }

  async create(session) {
    const { valid, errors } = session.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const newModel = await this.sessionModel.create(
      SessionMapper.toDatabase(session)
    );

    return SessionMapper.toEntity(newModel);
  }

  async findAll() {
    return this.sessionModel
      .findAll()
      .map(model => SessionMapper.toEntity(model));
  }

}

module.exports = SessionRepository;
