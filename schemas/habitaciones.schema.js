const joi = require('joi')

const id = joi.string();
const nombre = joi.string().min(3).max(20);
const cantCamas = joi.number().integer().min(1);
const tipo = joi.string().valid('privada', 'compartida');
const comodidades = joi.string();
const precioHabitacion = joi.number().integer();
const preciosCamas = joi.array();
const banoPrivado = joi.boolean();
const privada = joi.bool();
const bano = joi.string().valid('privado', 'compartido');
const descripcion = joi.string()
const imagenes = joi.array()


const crearHabitacionSchema = joi.object({
  nombre: nombre.required(),
  comodidades: comodidades.required(),
  cantCamas: cantCamas.required(),
  privada: privada.required(),
  banoPrivado: banoPrivado.required(),
  precioHabitacion,
  preciosCamas,
  descripcion: descripcion.required(),
  imagenes  
});


const actualizarHabitacionSchema = joi.object({
  nombre,
  cantCamas,
  comodidades,
  privada,
  banoPrivado,
  tipo,
  precioHabitacion,
  descripcion,
  imagenes,
});

const getHabitacionSchema = joi.object({
  id: id.required(),
});

const getHabitacionTipoSchema = joi.object({
tipo,
bano
})

module.exports = {
  crearHabitacionSchema,
  actualizarHabitacionSchema,
  getHabitacionSchema,
  getHabitacionTipoSchema
}
