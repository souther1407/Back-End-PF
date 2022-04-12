const joi = require('joi')

const id = joi.string();
//const nombre = joi.string().min(3).max(15);
const estado = joi.string().valid('reservada', 'ocupada',
'libre', 'mantenimiento');
const precio = joi.number().integer();
const HabitacionId = joi.number().integer()




const crearCamaSchema = joi.object({
  HabitacionId: HabitacionId.required(),
  // nombre: nombre.required(),
  precio: precio.required(),
  //estado: estado.required()
});


const actualizarCamaSchema = joi.object({
  //nombre,
  precio,
  estado,
});

const getCamaSchema = joi.object({
  id: id.required(),
});

module.exports = {
  crearCamaSchema,
  actualizarCamaSchema,
  getCamaSchema
}
