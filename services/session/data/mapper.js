'use strict';

const SessionEntity = require('../entities/session');

const SessionMapper = {

  toEntity(sequelizeModel) {
    return new SessionEntity(sequelizeModel.get({
      plain: true
    }));
  },

  toDatabase(entity) {
    return {
      accessToken: entity.accessToken,
      accessTokenTtl: entity.accessTokenTtl,
      refreshToken: entity.refreshToken,
      refreshTokenTtl: entity.refreshTokenTtl,
      user_id: entity.user.id
    };
  }
};

module.exports = SessionMapper;
