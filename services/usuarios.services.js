const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize')
const { Usuario } =  require('../db/models/usuario.model')

class userService {

  async crear(data) {
    const nuevoUsuario = await Usuario.create(data)
    return nuevoUsuario; 
  }

  async mostrarTodo() {
    const usuarios =  await Usuario.findAll()
    return usuarios;
  }

  async mostrarById(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw boom.notFound('el usuario solicitado no existe')
    }
    return usuario;
  }

  async update(id, changes) {
    const usuario = await this.findOne(id)
    const respuesta = await usuario.update(changes);
    return {
      respuesta
    };
  }

  async delete(id) {
    const usuario = await this.findOne(id)
    await usuario.destroy();
    return { id };
  }
}

module.exports = userService;
