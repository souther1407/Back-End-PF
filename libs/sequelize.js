const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index')
const {Model, DataTypes} = require('sequelize')
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const URI = 'postgres://ebzvjeht:2vQxks0hV0POuEpWoQKyyFo-_Uoi66QW@heffalump.db.elephantsql.com/ebzvjeht'


const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

const {Usuario, Habitacion, Reserva, Cama, Huesped, Nacionalidades, TipoDocumento, Imagen } = sequelize.models;

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


//Relacion huesped Cama
//una cama es ocupada por un huesped
//un huesped puede ocupar una cama

Huesped.hasOne(Cama)
Cama.belongsTo(Huesped)

// relacion cama reserva  
// una cama puede tener varias reservas
// una reserva puede tener varias camas 

Reserva.belongsToMany(Cama,{through:"Reserva_Cama"});
Cama.belongsToMany(Reserva,{through:"Reserva_Cama"});

// relacion habitacion reserva  

Reserva.belongsToMany(Habitacion,{through:"Reserva_Habitacion"});
Habitacion.belongsToMany(Reserva,{through:"Reserva_Habitacion"});

//relacion user nacionalidad
//un usuario tiene una nacionalidad
//un nacionalidad pertenece a un usuario

Nacionalidades.hasMany(Usuario)
Usuario.belongsTo(Nacionalidades)

//relacion huesped nacionalidad
//un huesped tiene una nacionalidad
//un nacionalidad pertenece a un huesped

Nacionalidades.hasMany(Huesped)
Huesped.belongsTo(Nacionalidades)

//relacion user tipoDocumento
//un user tiene una tipoDocumento
//un tipoDocumento pertenece a un user

TipoDocumento.hasMany(Usuario)
Usuario.belongsTo(TipoDocumento)

//relacion huesped tipoDocumento
//un huesped tiene una tipoDocumento
//un tipoDocumento pertenece a un huesped

TipoDocumento.hasMany(Huesped)
Huesped.belongsTo(TipoDocumento)

//relacion historialOcupante huesped cama

Huesped.belongsToMany( Cama,{through: Historial})
Cama.belongsToMany( Huesped,{through: Historial})


//relacion imágenes con habitaciones


Habitacion.hasMany(Imagen, {onDelete: 'cascade'});
Imagen.belongsTo(Habitacion)





sequelize.sync({ force: false })
  .then(() => {
    console.log(`base de datos creada/actualizada`);

    
  })
  .catch(err => console.log(err));

module.exports = sequelize
