const boom = require('@hapi/boom');
const bcrypt = require('bcrypt')
const config = require('../config/config')
const { sequelize } = require('../libs/sequelize')
const { Usuario } =  require('../db/models/usuario.model')
const HubSpotHelper = require('../utils/hubspot')
const hubservices = new HubSpotHelper
const {enviarEmail} = require('../utils/mailer')
const {plantillaEmailRegistro } = require('../utils/PlantillasEmail')

// const {Tipo_Documento} = require('../db/models/tipoDocumento.model')
// const {Nacionalidades} = require('../db/models/tipoDocumento.model')

const usuarioAdmin = {
  dni: "00000001",
  tipoDocumento:"DNI",
  password: "admin123",
  nombre: "SuperAdmin",
  apellido: "admin",
  email: "admin@admin.com",
  fechaNacimiento:"1971-01-01",
  telefono:"0000000",
  direccion:"desconocido 100",
  Nacionalidad:"LotLoriem",
  genero:"Other",
  rol:"administrador"
}
class UserService {
  
   async crear(data) {
   
      const hash = await bcrypt.hash(data.password, 12)
      const nuevoUsuario = await Usuario.create({
          nombre: data.name,
          apellido:data.lastname,
          rol:data.role,
          email: data.email,
          dni: data.dni,
          tipoDocumento:data.typeofdocument,
          password: hash,
          nacionalidad:data.nationality,
          fechaNacimiento:data.birthdate,
          genero:data.genre
      }); 
      
      if(!nuevoUsuario){
        throw boom.badData('no se pudo crear el usuario')
      }
      const mail = {
        from: 'Soy Hostel',
        to: `${data.email}`, 
        subject: "Bienvenido!",
        html: plantillaEmailRegistro(nuevoUsuario.nombre, nuevoUsuario.apellido),
      }
      const mailSender = await enviarEmail(mail)
      const hub = await hubservices.crearUsuario(nuevoUsuario)
      nuevoUsuario.dataValues.password = undefined;
      return nuevoUsuario; 
    

  }

  async mostrarTodo() {
  const usuariosexistentes = await Usuario.findAll();
    if (!usuariosexistentes.length) {
        const hash = await bcrypt.hash(usuarioAdmin.password, 12)
        const nuevoadmin = await Usuario.create({
          ...usuarioAdmin,
          password:hash
        })
        if(!nuevoadmin){
          throw boom.badData('no se pudo crear el SuperAdmin')
        }
        const usuario = await Usuario.findAll()
        delete usuario[0].dataValues.createdAt;
        delete usuario[0].dataValues.tokenRecuperacion;
        delete usuario[0].dataValues.refreshToken;
        delete usuario[0].dataValues.NacionalidadeId;
        delete usuario[0].dataValues.TipoDocumentoId;
        delete usuario[0].dataValues.telefono;
        delete usuario[0].dataValues.direccion;
        
    return {
    mensaje: `se creo el usuario Super admin (password: admin123), uselo para generar un usuario administrador y elimine a SuperAdmin inmediatamente, hasta tanto lo haga las medidas de seguridad estan desactivadas` ,
    usuario}

    
    }else{
    const usuario = await Usuario.findAll()
    return usuario
    
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

  async buscarPorGoogleId(googleId){
    const user = await Usuario.findOne({ where: { googleId:googleId }})
    console.log("adafaf el user",user)
    return user
  }

  async actualizar(dni, changes) {
    const usuario = await Usuario.findByPk(dni)
    const respuesta = await usuario.update({
          nombre:changes.name,
          apellido:changes.lastname,
          rol:changes.role,
          email: changes.email,
          dni: changes.dni,
          tipoDocumento:changes.typeofdocument,
          nacionalidad:changes.nationality,
          fechaNacimiento:changes.birthdate,
          genero:changes.genre

    });
    return {
      respuesta
    };
  }

  async delete(dni) {
    const usuario = await Usuario.findByPk(dni)
    await usuario.destroy();
    return { dni };
  }
}

module.exports = UserService;
