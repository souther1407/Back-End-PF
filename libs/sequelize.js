const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index')
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

const {Usuario, Habitacion, Reserva, Cama} = sequelize.models;

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

//Relacion usuario Cama
//una cama es ocupada por un usuario
//un usuario puede ocupar una cama

Cama.hasOne(Usuario)
Usuario.belongsTo(Cama)

// relacion Huesped reserva  
// una reserva tiene un Huesped
// un Huesped puede tener muchas reservas

// Huesped.hasMany(Reserva, {
//   foreignKey: 'dni'
// });
// Reserva.belongsTo(Huesped);

// relacion cama reserva  
// una cama puede tener varias reservas
// una reserva puede tener varias camas 
Reserva.hasMany(Cama);
Cama.belongsTo(Reserva);


sequelize.sync({ force: false })
  .then(() => {
    console.log(`base de datos creada/actualizada`);
  })
  .catch(err => console.log(err));

module.exports = sequelize
