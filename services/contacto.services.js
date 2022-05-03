const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { Contacto } =  require('../db/models/contacto.model')
const {enviarEmail} = require('../utils/mailer')


class ContactoService {



async crear(data) {
    const { name, lastname, email, textarea} = data
    const nuevoMensaje = await Contacto.create({
        nombre: name,
        apellido: lastname,
        email: email,
        mensaje: textarea
    })
    // if(!nuevoMensaje){
    //     throw boom.badData('no se pudo enviar el mensaje')
    // }
    const mail = {
        from: 'Soy Hostel',
        to: `${email}`, 
        subject: "Recibimos su Mensaje",
        html: `<b>Gracias por comunicarse con nosotros, nos pondremos en contacto con usted a la brevedad </b>`,
        }
    const enviarMail = await enviarEmail(mail)
    // if(!enviarMail){
    //     throw boom.badData('no pudimos enviar su mail')
    // }
    const interno = {
        from: `mensaje de -${name}- -${lastname}- desde -${email}-`, 
        to: "soyhostel@gmail.com", 
        subject: "Nuevo conctacto de Soy Henry", 
        text: `desde la web`, 
        html: `mensaje de: <b>${name} ${lastname}</b>, 
            <br>mensaje: <b>${textarea}</b>
            <br> direccion para respuesta: <span>${email}</span> `, 
    };
    const enviarInterno = await enviarEmail(interno)
    // if(!enviarInterno){
    //     throw boom.badData('no pudimos enviar el mail interno')
    // }
    return enviarMail
}



}

module.exports = ContactoService;