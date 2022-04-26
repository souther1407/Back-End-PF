const joi = require('joi')

const nombre = joi.string().min(3).max(12)
const apellido = joi.string().min(3).max(15)
const email = joi.string().email()
const mensaje = joi.string()

const mensajeSchema = joi.object({
   nombre: nombre.required(),
   apellido: apellido.required(),
   email: email.required(),
   mensaje: mensaje.required(), 
})


module.exports = { mensajeSchema }