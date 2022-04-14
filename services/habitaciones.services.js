const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');

class habitacionesService {

  async crear(data) {

    if(data.privada === true){
      try {
        const habitacion = await Habitacion.create({
          nombre: data.nombre,
          comodidades: data.comodidades,
          cantCamas: data.cantCamas,
          privada: data.privada,
          banoPrivado: data.banoPrivado,
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
          banoPrivado: data.banoPrivado,
        })
        for (let i = 0; i < data.cantCamas; i++) {
          Cama.create({
            precio: data.preciosCamas[0]
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


      return habitacion
  }

  // eslint-disable-next-line class-methods-use-this
  async buscar() {
    const habitacion = await Habitacion.findAll();
    return habitacion;
  }

  // eslint-disable-next-line class-methods-use-this
  async mostrarByHabitacion(id){
    const camas = await Cama.findAll({where: { HabitacionId : id}})
    return camas;
}

  // eslint-disable-next-line class-methods-use-this
  async buscaruno(id) {
    if(typeof id !== "number") throw new Error("no papa")
    let habitacion = Habitacion.findByPk(id);
    if(!habitacion.privada){
      habitacion = Habitacion.findByPk(id, {include: [Cama]})
    }
    if (!habitacion) {
      throw boom.notFound('no se encontro la habitacion')
    }
    return habitacion;
  }

  // eslint-disable-next-line class-methods-use-this
  async actualizar(id, cambios) {
    const {nombre, cantCamas, comodidades, tipoHabitacion} = cambios;

    const habitacionUpdate = await Habitacion.update({ 
      nombre: nombre,
      cantCamas: cantCamas,
      comodidades: comodidades,
      tipoHabitacion: tipoHabitacion
    }, 
      { where : { id : id }} 
    )

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

}

module.exports = habitacionesService
