const Joi = require('joi');

// const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8).max(14);
const nombre = Joi.string().min(4);
const apellido = Joi.string().min(3);
const dni = Joi.number().integer()
const tipoUsuario = Joi.string();

const createUserSchema = Joi.object({
  password: password.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  dni: dni.required(),
  email: email.required(),
  tipoUsuario: tipoUsuario.required(),
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
