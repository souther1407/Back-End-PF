const Joi = require('joi');

// const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8).max(14);
const nombre = Joi.string().min(4);
const apellido = Joi.string().min(3);
const dni = Joi.string()
const tipoUsuario = Joi.string();
const fechaNacimiento = Joi.date()
const nombreUser = Joi.string().alphanum().min(8).max(14)
const nacionalidad = Joi.string()
const tipoDocumento = Joi.string()

const createUserSchema = Joi.object({
  dni: dni.required(),
  password: password.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  tipoUsuario: tipoUsuario.required(),
  nombreUser,
  fechaNacimiento: fechaNacimiento.required(),
  nacionalidad,
  tipoDocumento: tipoDocumento.required(),
});

const updateUserSchema = Joi.object({
  password: password,
  nombre: nombre,
  apellido: apellido,
  email: email,
  tipoUsuario: tipoUsuario,
});

const getUserSchema = Joi.object({
  dni: dni.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
