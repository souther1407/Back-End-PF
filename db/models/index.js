const { Usuario, UsuarioSchema} = require('./usuario.model');
const { Habitacion, HabitacionSchema} = require('./habitacion.model');
const { ReservaCama, ReservaCamaSchema} = require('./reservaCama.model');
const { Cama, CamaSchema} = require('./cama.model')
const { Huesped, HuespedSchema } = require('./huesped.model');
const {Nacionalidades,nacionalidadesSchema} = require("./nacionalidad.model")
const {TipoDocumento,tipoDocumentoSchema} = require("./tipoDocumento.model");
const { HistorialOcupante, HistorialOcupanteSchema } = require('./historialOcupante.model');

const {Imagen,ImagenesSchema} = require("./imagen.model")

// const {Fecha,FechasSchema} = require("./fecha.model")



/* const {Imagenes,ImagenesSchema} = require("./imagenes.model") */


function setupModels(sequelize) {

  // Fecha.init(FechasSchema, Fecha.config(sequelize))

  Imagen.init(ImagenesSchema, Imagen.config(sequelize))
  HistorialOcupante.init(HistorialOcupanteSchema, HistorialOcupante.config(sequelize))
  Huesped.init(HuespedSchema, Huesped.config(sequelize))
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Habitacion.init(HabitacionSchema, Habitacion.config(sequelize));
  ReservaCama.init(ReservaCamaSchema, ReservaCama.config(sequelize));
  Cama.init(CamaSchema, Cama.config(sequelize));
  Nacionalidades.init(nacionalidadesSchema,Nacionalidades.config(sequelize));
  TipoDocumento.init(tipoDocumentoSchema,TipoDocumento.config(sequelize));
}

module.exports = setupModels;

