const joi = require('joi')

const id = joi.string();
const nombre = joi.string().alphanum().min(3).max(15);
const cantCamas = joi.number().integer().min(1);
const tipoHabitacion = joi.string().valid('privada', 'compartida');
const comodidades = joi.string();

const crearHabitacionSchema = joi.object({
  nombre: nombre.required(),
  // cantCamas: cantCamas.required(),
  tipoHabitacion: tipoHabitacion.required(),
  comodidades: comodidades
});

const actualizarHabitacionSchema = joi.object({
  nombre: nombre,
  cantCamas: cantCamas,
  comodidades: comodidades,
  tipoHabitacion: tipoHabitacion
});

const getHabitacionSchema = joi.object({
  id: id.required(),
});

module.exports = {
  crearHabitacionSchema,
  actualizarHabitacionSchema,
  getHabitacionSchema
}
