const Joi = require('joi');

// const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8).max(14);
const nombre = Joi.string().min(4);
const apellido = Joi.string().min(3);
const dni = Joi.string()
const tipoUsuario = Joi.string();
const fechaNacimiento = Joi.date()
const telefono= Joi.string().length(10).pattern(/^[0-9]+$/);
const Nacionalidad = Joi.string()
const TipoDocumento = Joi.string()
const genero = Joi.string().valid("masculino", "femenino", "otro")
const rol = Joi.string().valid("cliente", "administrador", "recepcionista")
const direccion = Joi.string()

const createUserSchema = Joi.object({
  dni: dni.required(),
  password: password.required(),
  nombre: nombre.required(),
  apellido: apellido.required(),
  email: email.required(),
  fechaNacimiento: fechaNacimiento.required(),
  Nacionalidad,
  telefono,
  direccion,
  TipoDocumento: TipoDocumento.required(),
  genero: genero.required(),
  rol: rol.required().valid('administrador', 'recepcionista',
  'cliente')
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
