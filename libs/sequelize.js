const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index')
const {Model, DataTypes} = require('sequelize')
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);


const options = {
  dialect: `postgres`,
  logging: config.isProd ? false: true,
}
if (config.isProd) {
  options.dialectOptions = {
    ssl: {
    rejectUnauthorized: false 
    } 
  } 
}

const sequelize = new Sequelize(config.dbUrl, options);
setupModels(sequelize);


const {Usuario, Habitacion, Reserva, Cama, Huesped, Nacionalidades, TipoDocumento, Imagen, Pago } = sequelize.models;


const Historial = sequelize.define('Historial',{
  checkIn:{
    type: DataTypes.DATEONLY,
    allowed: false
},
checkOut:{
    type: DataTypes.DATEONLY,
    allowed: false
}
})



// relacion habitacion-camas 1 a muchos muchos a 1
//  una habitacion tiene muchas camas
// una cama pertenece a una habitacion

Habitacion.hasMany(Cama, { onDelete: 'cascade'});
Cama.belongsTo(Habitacion);

// relacion usuario reserva  
// una reserva tiene un usuario
// un usuario puede tener muchas reservas

Usuario.hasMany(Reserva);
Reserva.belongsTo(Usuario);


// Relacion huesped Cama
// una cama es ocupada por un huesped
// un huesped puede ocupar una cama

Huesped.hasOne(Cama, {foreignKey: 'HuespedDni'})
Cama.belongsTo(Huesped)

// relacion cama reserva  
// una cama puede tener varias reservas
// una reserva puede tener varias camas 

Reserva.belongsToMany(Cama,{through:"Reserva_Cama"});
Cama.belongsToMany(Reserva,{through:"Reserva_Cama"});

// relacion habitacion reserva  

Reserva.belongsToMany(Habitacion,{through:"Reserva_Habitacion"});
Habitacion.belongsToMany(Reserva,{through:"Reserva_Habitacion"});

// relacion user nacionalidad
// un usuario tiene una nacionalidad
// un nacionalidad pertenece a un usuario

Nacionalidades.hasMany(Usuario)
Usuario.belongsTo(Nacionalidades)

// relacion huesped nacionalidad
// un huesped tiene una nacionalidad
// un nacionalidad pertenece a un huesped

Nacionalidades.hasMany(Huesped)
Huesped.belongsTo(Nacionalidades)


// un user tiene una tipoDocumento
// un tipoDocumento pertenece a un user

TipoDocumento.hasMany(Usuario)
Usuario.belongsTo(TipoDocumento)

// relacion huesped tipoDocumento
// un huesped tiene una tipoDocumento
// un tipoDocumento pertenece a un huesped

TipoDocumento.hasMany(Huesped)
Huesped.belongsTo(TipoDocumento)

// relacion historialOcupante huesped cama

Huesped.belongsToMany( Cama,{through: Historial})
Cama.belongsToMany( Huesped,{through: Historial})

//relacion huespedes habitacion
//una habitacion es ocupada por muchos huespedes
//muchos huespedes pueden ocupar una cama

Huesped.belongsToMany(Habitacion, {through: 'Huesped_Habitacion'})
Habitacion.belongsToMany(Huesped, {through: 'Huesped_Habitacion'})

// relacion imágenes con habitaciones

Habitacion.hasMany(Imagen, {onDelete: 'cascade'});
Imagen.belongsTo(Habitacion)


// relacion imágenes con habitaciones con pago
Pago.hasOne(Reserva)
Reserva.belongsTo(Pago,{onDelete: "cascade" })


sequelize.sync({ force: false })
  .then(() => {
    console.log(`base de datos creada/actualizada `);
    
  })
  .catch(err => console.log(err));

module.exports = sequelize
