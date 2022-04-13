const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models/index')
const {Model, DataTypes} = require('sequelize')
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@localhost:5432/hostel`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

const {Usuario, Habitacion, Reserva, Cama, Huesped, Nacionalidades, TipoDocumento, HistorialOcupante } = sequelize.models;

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

sequelize.sync({ force: true })
  .then(async() => {
    console.log(`base de datos creada/actualizada`);

    //TEST: Nacionalidad de prueba, borrar luego
    const argentino = await Nacionalidades.create({nombre:"Argentina"})

    //TEST: tipo de documento de prueba, borrar luego
    const dni = await TipoDocumento.create({nombre:"DNI"})

    //TEST: Usuario de prueba, borrar luego
    const user1 = await Usuario.create({
      nombre:"Ignacio",
      apellido:"Lestrada",
      telefono:1234,
      direccion:"asdasf",
      nombreUser:"igna1407",
      email:"adasd@asd.com",
      password:"12345",
    })
    
    user1.setNacionalidade(argentino) //D: Nacionalidade
    user1.setTipoDocumento(dni)


    //TEST: habitaciones con camas de prueba, borrar luego
    const habitacion1 = await Habitacion.create({
      nombre:"La casona de Marcela",
      comodidades:"TV, internet",
      cantCamas:1,
      privada:true,
      bañoPrivado:true,
    })

    //TEST: cama de prueba, borrar luego
    const cama1 = await Cama.create({
      precio:300,
      estado:"libre",
    })

    habitacion1.addCama(cama1)

    //TEST: Reservas de prueba, borrar luego
    const res1 = await Reserva.create({
      fecha_ingreso:new Date().toISOString(),
      fecha_egreso:new Date("1/5/2025").toISOString(),
      saldo:300
    })
    const res2 = await Reserva.create({
      fecha_ingreso:new Date("3/1/2025").toISOString(),
      fecha_egreso:new Date("9/1/2029").toISOString(),
      saldo:12409124809
    })

    const res3 = await Reserva.create({
      fecha_ingreso:new Date().toISOString(),
      fecha_egreso:new Date("1/1/2023").toISOString(),
      saldo:3234
    })
    res1.setUsuario(user1);
    res2.setUsuario(user1);
    res3.setUsuario(user1);
    res1.addCama(cama1);
    res2.addCama(cama1);
    res3.addCama(cama1);
    
  })
  .catch(err => console.log(err));

module.exports = sequelize
