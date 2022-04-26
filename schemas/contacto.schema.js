const joi = require('joi')

const name = joi.string().min(3).max(12)
const lastname = joi.string().min(3).max(15)
const email = joi.string().email()
const textarea = joi.string()

const mensajeSchema = joi.object({
   name: name.required(),
   lastname: lastname.required(),
   email: email.required(),
   textarea: textarea.required(), 
})


module.exports = { mensajeSchema }