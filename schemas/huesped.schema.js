const joi = require('joi')

const dni = joi.string()
const nombre = joi.string()
const apellido = joi.string()
const direccion = joi.string().alphanum()
const telefono = joi.string().length(10).pattern(/^[0-9]+$/)
const genero = joi.string().valid('Male', 'Female', 'Other')
const email = joi.string()
const nacionalidad = joi.string()
const tipoDocumento = joi.string()

const createHuespedSchema = joi.object({
    dni: dni.required(),
    nombre: nombre.required(),
    apellido: apellido.required(),
    tipoDocumento: tipoDocumento.required(),
    genero: genero.required(),
    nacionalidad: nacionalidad.required(),
    email,
    telefono,
    direccion,
})

const createArrayHuespedesSchema = joi.array().items(createHuespedSchema)

const getHuespedSchema = joi.object({
    dni: dni.required()
})

module.exports = { createHuespedSchema, getHuespedSchema,createArrayHuespedesSchema}