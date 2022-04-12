const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');

class habitacionesService {

  async crear(data) {
    if(data.privada){
      try {
        const habitacion = await Habitacion.create({
          nombre: data.nombre,
          comodidades: data.comodidades,
          cantCamas: data.cantCamas,
          privada: data.privada,
          bañoPrivado: data.bañoPrivado,
          precio: data.precioHabitacion
        })
        return habitacion
      } catch(error) {
        console.log(error)
      }
    }else{
      try {
        const habitacion = await Habitacion.create({
          nombre: data.nombre,
          comodidades: data.comodidades,
          cantCamas: data.cantCamas,
          privada: data.privada,
          bañoPrivado: data.bañoPrivado,
        })
        for (let i = 0; i < data.cantCamas; i++) {
          Cama.create({
            precio: data.preciosCamas[i]
          })
          .then((cama)=>{
            habitacion.setCamas(cama)
          })
        }
        return habitacion
      } catch(error) {
        console.error(error)
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async buscar() {
    const habitacion = await Habitacion.findAll();
    for (let i = 0; i < habitacion.length; i++) {
      if(!habitacion[i].privada){
        habitacion[i] = await Habitacion.findByPk(habitacion[i].id, {include: [Cama]})
      }
    }
    return habitacion;
  }

// CUMPLE LA MISMA FUNCION QUE BUASCAR UNO
// async mostrarByHabitacion(id){
//  const camas = await Cama.findAll({where: { HabitacionId : id}})
//  return camas;
// }

  async buscaruno(id) {
    let habitacion = await Habitacion.findByPk(id);
    if(!habitacion.privada){
      habitacion = Habitacion.findByPk(id, {include: [Cama]})
    }
    if (!habitacion) {
      throw boom.notFound('no se encontro la habitacion')
    }
    return habitacion;
  }

  async actualizar(id, cambios) {
    const {nombre, comodidades, privada, precioHabitacion, bañoPrivado} = cambios;

    const habitacionUpdate = await Habitacion.update({ 
      nombre,
      comodidades,
      privada,
      precioHabitacion,
      bañoPrivado
    }, 
      { where : { id }} 
    )
    console.log(habitacionUpdate)

    if(!habitacionUpdate) {
      throw boom.notFound('habitacion no encontrada');
    }
    return habitacionUpdate;

  }

  async borrar(id) {
    const habitacionDelete = Habitacion.destroy({where: { id: id}})

    if(!habitacionDelete) {
      throw boom.notFound('habitacion no encontrada');
    }
    return `Habitacion con id: ${id} fue borrada con exito`;
  }

  async FilterByTypeRoom(privada) {
    let Rooms;
    Rooms = await Habitacion.findAll({where: {privada: privada}})
    return Rooms;
  }
  async FilterWithBathroom() {
    let Rooms;
    Rooms = await Habitacion.findAll({where: {bañoPrivado: true}})
    return Rooms;
  }
}

module.exports = habitacionesService
