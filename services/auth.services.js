const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const {config} = require('../config/config');
const UserService = require("./usuarios.services");
const service = new UserService();

//prueba token
const SECRET= "nsz6ti0v8bXql5yjaR9ZADkYLeHWEcfF"
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

     firmarToken(usuario){
        const payload = {
        sub:usuario.dni,
        role: usuario.rol,
        }
        const token = jwt.sign(payload, SECRET );
        
        return ({
        usuario :usuario.email,
        rol: usuario.rol,
        token
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
        
      }

    }
}


module.exports = AuthServices;