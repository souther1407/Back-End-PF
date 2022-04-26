const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { Contacto } =  require('../db/models/contacto.model')
const AuthServices = require('./auth.services')
const servicesAuth = new AuthServices


class ContactoService {



async crear(data) {
    const { nombre, apellido, email, mensaje} = data
    const nuevoMensaje = await Contacto.create({
        nombre,
        apellido,
        email,
        mensaje
    })
    if(!nuevoMensaje){
        throw boom.badData('no se pudo enviar el mensaje')
    }
    const mail = {
        from: 'Soy Hostel',
        to: `${data.email}`, 
        subject: "Recibimos su Mensaje",
        html: `<b>Gracias por omunicarse con nosotros, nos pondremos en contacto con usted a la brevedad </b>`,
        }
    const enviarMail = await servicesAuth.enviarEmail(mail)
    if(!enviarMail){
        throw boom.badData('no pudimos enviar su mail')
    }
    const interno = {
        from: `mensaje de -${nombre}- -${apellido}- desde -${email}-`, 
        to: "soyhostel@gmail.com", 
        subject: "Nuevo conctacto de Soy Henry", 
        text: `desde la web`, 
        html: `mensaje de: <b>${nombre} ${apellido}</b>, 
              <br>mensaje: <b>${mensaje}</b>
              <br> direccion para respuesta: <span>${email}</span> `, 
      };
      const enviarInterno = await servicesAuth.enviarEmail(interno)
      if(!enviarInterno){
          throw boom.badData('no pudimos enviar su mail')
      }
    return enviarMail
}



}

module.exports = ContactoService;