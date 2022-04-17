const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('../../../services/usuarios.services');
const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const usuario = await service.buscarPorEmail(email);
      if (!usuario) {
        done(boom.unauthorized(), false);
      }
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }
      delete usuario.dataValues.password;
      done(null, usuario);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;