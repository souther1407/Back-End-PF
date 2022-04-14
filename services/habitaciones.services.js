const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');


// function cameadora (habitacion,preciosCamas, cantidadCamas) {
//   for (let i = 0; i < cantidadCamas; i++) {
//     setTimeout(()=>{
//       Cama.create({
//         precio: preciosCamas.length > 1 ? preciosCamas[i] : preciosCamas[0],
//       })
//       .then((cama)=>{
//         habitacion.setCamas(cama);
//       })
//     },3000)
//   }
// }

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
          precio: data.precioHabitacion,
          descripcion: data.descripcion,
        })
        return habitacion
      } catch(error) {
        console.log(error)
      }
    }else{
      try {
        let precioHabitacion = 0;

        for (let i = 0; i < data.cantCamas; i++) {
         data.preciosCamas.length > 1 ? precioHabitacion += data.preciosCamas[i] : precioHabitacion = data.preciosCamas[0] * data.cantCamas;
        }
        const habitacion = await Habitacion.create({
          nombre: data.nombre,
          comodidades: data.comodidades,
          cantCamas: data.cantCamas,
          privada: data.privada,
          banoPrivado: data.banoPrivado,
          precio: precioHabitacion,
          descripcion: data.descripcion,
        })
        for (let i = 0; i < data.cantCamas; i++) {
            Cama.create({
              precio: data.preciosCamas.length > 1 ? data.preciosCamas[i] : data.preciosCamas[0],
            })
            .then((cama)=>{
              habitacion.setCamas(cama);
            })
            .catch(error => console.log(error))
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
      if(habitacion[i].privada === false){
        habitacion[i] = await Habitacion.findByPk(habitacion[i].id, {include: [Cama]})
      }
      
    }
    return habitacion;
  }

  // eslint-disable-next-line class-methods-use-this
  async mostrarByHabitacion(id){
    const camas = await Cama.findAll({where: { HabitacionId : id}})
    return camas;
}

  // eslint-disable-next-line class-methods-use-this
  async buscaruno(id) {
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



