const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')

const { sequelize } = require('../libs/sequelize')
const { Usuario } =  require('../db/models/usuario.model')
// const {Tipo_Documento} = require('../db/models/tipoDocumento.model')
// const {Nacionalidades} = require('../db/models/tipoDocumento.model')

const usuarioAdmin = {
  dni: "00000001",
  TipoDocumento:"dni",
  password: "admin 123",
  nombre: "SuperAdmin",
  apellido: "admin",
  email: "admin@admin.com",
  fechaNacimiento:"01-01-1971",
  telefono:"0000000",
  direccion:"desconocido 100",
  Nacionalidad:"LotLoriem",
  genero:"masculino",
  rol:"administrador"
}
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
  const usuariosexistentes = await Usuario.findAll();
    if (!usuariosexistentes.length) {
      try {
        await this.crear(usuarioAdmin)
        const usuario = await Usuario.findAll()
        delete usuario[0].dataValues.createdAt;
        delete usuario[0].dataValues.tokenRecuperacion;
        delete usuario[0].dataValues.refreshToken;
        delete usuario[0].dataValues.NacionalidadeId;
        delete usuario[0].dataValues.TipoDocumentoId;
        delete usuario[0].dataValues.telefono;
        delete usuario[0].dataValues.direccion;
        
          return {
          mensaje: `se creo el usuario Super admin, uselo para generar un usuario administrador y elimine a SuperAdmin inmediatamente, hasta tanto lo haga las medidas de seguridad estan desactivadas` ,
          usuario
        }
      } catch(error) {
        return boom.notFound('algo salio mal')
      }
    }else{
      try {
        const usuario = await Usuario.findAll()
        return usuario
      } catch(error) {
      return boom.badData('algo salio mal')  
      }


    }
    
  }

  async buscarPorEmail(email) {
    const usuarios =  await Usuario.findOne({
      where: {
        email
      }
    })
    return usuarios;
  }

  async mostrarByDni(dni) {
    const usuario = await Usuario.findByPk(dni);
    if (!usuario) {
      throw boom.notFound('el usuario solicitado no existe')
    }
    delete usuario.dataValues.refreshToken;
    delete usuario.dataValues.password;
    delete usuario.dataValues.createdAt;
    delete usuario.dataValues.tokenRecuperacion;
    return usuario;
  }

  async actualizar(dni, changes) {
    const usuario = await Usuario.findByPk(dni)
    const respuesta = await usuario.update(changes);
    return {
      respuesta
    };
  }

  async delete(dni) {
    const usuario = await Usuario.findOne(dni)
    await usuario.destroy();
    return { dni };
  }
}

module.exports = UserService;
