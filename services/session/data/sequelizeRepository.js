'use strict';

class SessionRepository {

  constructor(sessionModel, sessionMapper, mapValidationErrors,
    userRepository) {
    this.sessionModel = sessionModel;
    this.sessionMapper = sessionMapper;
    this.mapValidationErrors = mapValidationErrors;
    this.userRepository = userRepository;
  }

  async create(session) {
    const { valid, errors } = session.validate();

    if (!valid) {
      throw this.mapValidationErrors(errors);
    }

    let newModel = null;
    try {
      newModel = await this.sessionModel.create(
        this.sessionMapper.toDatabase(session)
      );
    } catch (sequelizeError) {
      throw this.mapValidationErrors(sequelizeError.errors);
    }

    return this.sessionMapper.toEntity(newModel);
  }

  async findAll() {
    return this.sessionModel
      .findAll()
      .map(model => this.sessionMapper.toEntity(model));
  }

}

module.exports = SessionRepository;
