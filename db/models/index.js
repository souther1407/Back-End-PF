const { Usuario, UsuarioSchema} = require('./usuario.model');
const { Habitacion, HabitacionSchema} = require('./habitacion.model');
const { ReservaCama, ReservaCamaSchema} = require('./reservaCama.model');
const { Cama, CamaSchema} = require('./cama.model')
const { Huesped, HuespedSchema } = require('./huesped.model');
const {Nacionalidades,nacionalidadesSchema} = require("./nacionalidad.model")
const {TipoDocumento,tipoDocumentoSchema} = require("./tipoDocumento.model");
const { HistorialOcupante, HistorialOcupanteSchema } = require('./historialOcupante.model');
const {Pago, PagoSchema} = require("./pago.model")
const {Imagen,ImagenesSchema} = require("./imagen.model")
<<<<<<< HEAD
const {HostelSchema, Hostel } = require('./hostel.model');
=======
const {Contacto,ContactoSchema} = require("./contacto.model")
>>>>>>> production

function setupModels(sequelize) {
  Imagen.init(ImagenesSchema, Imagen.config(sequelize))
  Contacto.init(ContactoSchema, Contacto.config(sequelize))
  Pago.init(PagoSchema, Pago.config(sequelize))
  HistorialOcupante.init(HistorialOcupanteSchema, HistorialOcupante.config(sequelize))
  Huesped.init(HuespedSchema, Huesped.config(sequelize))
  Usuario.init(UsuarioSchema, Usuario.config(sequelize));
  Habitacion.init(HabitacionSchema, Habitacion.config(sequelize));
  ReservaCama.init(ReservaCamaSchema, ReservaCama.config(sequelize));
  Cama.init(CamaSchema, Cama.config(sequelize));
  Nacionalidades.init(nacionalidadesSchema,Nacionalidades.config(sequelize));
  TipoDocumento.init(tipoDocumentoSchema,TipoDocumento.config(sequelize));
  Pago.init(PagoSchema,Pago.config(sequelize))
  Hostel.init(HostelSchema,Hostel.config(sequelize))
}

module.exports = setupModels;

