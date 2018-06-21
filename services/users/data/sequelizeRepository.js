'use strict';

class UserRepository {

  constructor(userModel, userMapper, mapValidationErrors) {
    this.userModel = userModel;
    this.userMapper = userMapper;
    this.mapValidationErrors = mapValidationErrors;
  }

  async create(user) {
    const { valid, errors } = user.validate();

    if (!valid) {
      throw this.mapValidationErrors(errors);
    }

    let newModel = null;

    try {
      newModel = await this.userModel.create(
        this.userMapper.toDatabase(user)
      );
    } catch (sequelizeError) {
      throw this.mapValidationErrors(sequelizeError.errors);
    }

    return this.userMapper.toEntity(newModel);
  }

  async findAll() {
    return this.userModel
      .findAll()
      .map(model => this.userMapper.toEntity(model));
  }

  async findByEmail(email) {
    const model = this.userModel.findOne({
      where: {
        email
      }
    });
    return this.userMapper.toEntity(model);
  }

}

module.exports = UserRepository;
