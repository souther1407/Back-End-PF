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
const genero = Joi.string().valid("masculino", "femenino", "otro")
const rol = Joi.string().valid("cliente", "administrador", "recepcionista")

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
  genero: genero.required(),
  rol: rol.required()
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
