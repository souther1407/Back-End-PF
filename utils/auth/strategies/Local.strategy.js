const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/usuarios.services');
const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'nombreUser',
    passwordField: 'password'
  },
  async (nombreUser, password, done) => {
    try {
      const user = await service.findByEmail(nombreUser);
      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;