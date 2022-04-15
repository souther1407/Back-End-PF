const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const { sequelize } = require('../libs/sequelize')
const { Usuario } =  require('../db/models/usuario.model')

class UserService {

  async crear(data) {
    const hash = await bcrypt.hash(data.password, 12)
    const nuevoUsuario = await Usuario.create({
      ...data,
      password: hash
    })
    delete nuevoUsuario.dataValues.password;
    return nuevoUsuario; 
  }

  async mostrarTodo() {
    const usuarios =  await Usuario.findAll()
    return usuarios;
  }

  async mostrarPorNombreUsuario(username) {
    const usuarios =  await Usuario.findOne({
      where: {
        nombreUser:username
      }
    })
    return usuarios;
  }

  async mostrarByDni(dni) {
    const usuario = await Usuario.findByPk(dni);
    if (!usuario) {
      throw boom.notFound('el usuario solicitado no existe')
    }
    return usuario;
  }

  async update(id, changes) {
    const usuario = await Usuario.findOne(id)
    const respuesta = await usuario.update(changes);
    return {
      respuesta
    };
  }

  async delete(id) {
    const usuario = await Usuario.findOne(id)
    await usuario.destroy();
    return { id };
  }
}

module.exports = UserService;
