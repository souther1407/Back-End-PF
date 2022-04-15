const Joi = require('joi');

// const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8).max(14);
const nombre = Joi.string().min(4);
const apellido = Joi.string().min(3);
const dni = Joi.number().integer()
const tipoUsuario = Joi.string();
const fechaNacimiento = Joi.date()
const nombreUser = Joi.string().alphanum().min(8).max(14)

const createUserSchema = Joi.object({
  dni: dni.required(),
  password: password.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  tipoUsuario: tipoUsuario.required(),
  nombreUser: nombreUser.required(),
  fechaNacimiento: fechaNacimiento.required()
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
