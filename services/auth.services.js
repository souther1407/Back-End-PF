const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { Usuario } = require('../db/models/usuario.model');
const {config} = require('../config/config');
const UserService = require("./usuarios.services");
const service = new UserService();


class AuthServices {

    async traerUsuario(email, password){
        const usuario = await service.buscarPorEmail(email);
      if (!usuario) {
        throw boom.unauthorized();
      }
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        throw boom.unauthorized();
      }
      delete usuario.dataValues.password;
      return usuario
    }

    async firmarToken(usuario){
        const payload = {
        sub:usuario.dni,
        role: usuario.rol,
        }
        const token = jwt.sign(payload, config.jwtSecret);
        // const refreshToken = jwt.sign(payload, config.jwtRefresh, {expiresIn: '10d'} ); (en desuso por ahora)
        // await service.actualizar(usuario.dni, {refreshToken: refreshToken });
        return ({
        usuario :usuario.email,
        rol: usuario.rol,
        
        token,
        // refreshToken
    });
    }


    async enviarEmail(infomail) {
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
    user: config.email,
    pass: config.emailPassword
            }
        });
    await transporter.sendMail(infomail);
    return {message: 'se envio el correo'}        
    }

    async enviarRecuperacion(email){
    const usuario = await service.buscarPorEmail(email);
    if (!usuario) {
    throw boom.unauthorized();
    }
    const payload = {sub: usuario.dni };
    const token = jwt.sign(payload, config.jwtRecuperacion, {expiresIn: '10min'} );
    const link = `http://rodrigoquintero.tamarindorivas.com?token=${token}`
    await service.actualizar(usuario.dni, {tokenRecuperacion: token })
    const mail = {
    from: 'WebMaster',
    to: `${usuario.email}`, 
    subject: "Email para recuperar contraseña",
    html: `<b>Ingresa a este link => ${link} </b>`,
    }
    const respuesta = await this.enviarEmail(mail);
    return respuesta;
    }

    async cambiarPaswword(token, newPassword){
       try {
        const payload = jwt.verify(token, config.jwtRecuperacion);
        const usuario = await service.mostrarByDni(payload.sub);
        if (usuario.tokenRecuperacion !== token){
          throw boom.unauthorized();
        }
        const hash = await bcrypt.hash(newPassword, 12)
        await service.actualizar(usuario.dni, {tokenRecuperacion: null, password: hash })
        return { message: 'password actualizado'}
      } catch(error) {
        throw boom.unauthorized()
      }}

      async refreshToken (data) {
        const refreshToken = data.headers.refresh
        if(!refreshToken) {
          return boom.badData('falta refreshToken')
        }
        try {
          const vericarToken = jwt.verify(refreshToken, config.jwtRefresh)
          const {sub} = vericarToken
          const usuario = await Usuario.findByPk(sub)
          const payload = {
            sub:usuario.dni,
            role: usuario.rol,
            }
            const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '1h'} );
            await service.actualizar(usuario.dni, {refreshToken: token });
            
          return ({
            message: 'procedimiento de refresh-token Ok',
            token
          })
        } catch(error) {
          return boom.badData(error.message)
        }
        
  
  
      }
}


module.exports = AuthServices;