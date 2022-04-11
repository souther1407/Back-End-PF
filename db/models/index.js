const { Usuario, UsuarioSchema} = require('./usuario.model');
const { Habitacion, HabitacionSchema} = require('./habitacion.model');
const { ReservaCama, ReservaCamaSchema} = require('./reservaCama.model');
const { Cama, CamaSchema} = require('./cama.model')
const { Rol, RolSchema} = require('./rol.model');

function setupModels(sequelize) {
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Habitacion.init(HabitacionSchema, Habitacion.config(sequelize));
  ReservaCama.init(ReservaCamaSchema, ReservaCama.config(sequelize));
  Cama.init(CamaSchema, Cama.config(sequelize));
  Rol.init(RolSchema, Rol.config(sequelize));
}

module.exports = setupModels;

