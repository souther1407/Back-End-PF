const joi = require('joi')

const id = joi.string();
const nombre = joi.string().min(3).max(15);
const cantCamas = joi.number().integer().min(1);
const tipoHabitacion = joi.string().valid('privada', 'compartida');
const comodidades = joi.string();
const precioHabitacion = joi.number().integer();
const preciosCamas = joi.array();
const bañoPrivado = joi.boolean();
const privada = joi.bool();


const crearHabitacionSchema = joi.object({
  nombre: nombre.required(),
  comodidades: comodidades.required(),
  cantCamas: cantCamas.required(),
  privada: privada.required(),
  bañoPrivado: bañoPrivado.required(),
  precioHabitacion,
  preciosCamas,

});


const actualizarHabitacionSchema = joi.object({
  nombre,
  cantCamas,
  comodidades,
  tipoHabitacion,
  privada,
  bañoPrivado,
  precioHabitacion
});

const getHabitacionSchema = joi.object({
  id: id.required(),
});

module.exports = {
  crearHabitacionSchema,
  actualizarHabitacionSchema,
  getHabitacionSchema
}
