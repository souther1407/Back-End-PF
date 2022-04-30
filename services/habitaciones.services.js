const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');
const { Imagen } = require('../db/models/imagen.model');
const { ReservaCama } = require('../db/models/reservaCama.model');


class habitacionesService {
  async crear(data) {
    if (data.privada === true) {
      if(!data.precioHabitacion) return boom.badData('no se puede crear una habitacion privada sin precio');
        const habitacion = await Habitacion.create({
          nombre: data.nombre,
          comodidades: data.comodidades,
          cantCamas: data.cantCamas,
          privada: data.privada,
          banoPrivado: data.banoPrivado,
          precio: data.precioHabitacion,
          descripcion: data.descripcion,
        });

        if (data.imagenes.length) {
          for (let i = 0; i < data.imagenes.length; i++) {
            Imagen.create({

            imagen: data.imagenes[i]
          })
          .then((imagen)=>{
            habitacion.setImagens(imagen);
          })
          .catch(error => console.log(error))
        }          
        }else {
          Imagen.create({

          }).then((imagen)=>{
            habitacion.setImagens(imagen);
          }).catch(error => console.log(error))
        }
        return habitacion
    } else {
      if(!data.preciosCamas) return boom.badData('no se puede crear una habitacion compartida sin precios de camas');
        let precioHabitacion = 0;
        if(data.preciosCamas.length > 1 && data.preciosCamas.length !== data.cantCamas ){
          throw boom.badData('falta precio de una cama')
        }

        for (let i = 0; i < data.cantCamas; i++) {
         // eslint-disable-next-line no-unused-expressions
          data.preciosCamas.length > 1 ? 
          precioHabitacion += data.preciosCamas[i] : 
          precioHabitacion = data.preciosCamas[0] * data.cantCamas;
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

        if(data.imagenes.length) {
          for (let i = 0; i < data.imagenes.length; i++) {
            Imagen.create({
              imagen: data.imagenes.length ? data.imagenes[i] : data.imagenes[0]
            })
            .then((imagen)=>{
              habitacion.setImagens(imagen);
            })
            .catch(error => console.log(error))
          }          
        }else {
          Imagen.create()
          .then((imagen)=>{
            habitacion.setImagens(imagen);
          }).catch(error => console.log(error))
        }

        for (let i = 0; i < data.cantCamas; i++) {
          Cama.create({
            nombre: `cama ${i+1} de ${data.nombre}`,
            precio: data.preciosCamas.length > 1
                ? data.preciosCamas[i]
                : data.preciosCamas[0]
          })
          .then((cama) => {
            habitacion.setCamas(cama);
          })
          .catch((error) => boom.badData(error.message));
        }
        return habitacion;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async buscar() {
    const habitacion = await Habitacion.findAll({
      include: [{model:Imagen, attributes: [ 'imagen' ] },{model:Cama, attributes: [ 'id', 'precio', 'estado', 'nombre'] }]
    });
    if(!habitacion){
      throw boom.notFound('no se encontro ninguna habitacio')
    }
    for (let i = 0; i < habitacion.length; i++) {
      if (habitacion[i].privada === true) {
        delete habitacion[i].dataValues.Camas}
      
      return habitacion;
  }}

  
  // eslint-disable-next-line class-methods-use-this
  async buscaruno(id) {
    
    let habitacion = await Habitacion.findByPk(id);
    
    if (habitacion === null) {
      throw boom.notFound('no exite la habitacion')}
    if (!habitacion.privada) {
      habitacion = await Habitacion.findByPk(id, {
        include: [Cama, Imagen, ReservaCama],
      });
    }
    if (!habitacion) {
      throw boom.notFound('no se encontro la habitacion');
    }
    return habitacion;
  }

  // eslint-disable-next-line class-methods-use-this
  async actualizar(id, cambios) {
    const {
        nombre,
        cantCamas,
        comodidades,
        privada,
        banoPrivado,
        tipo,
        precioHabitacion,
        descripcion,
        imagenes,
    } = cambios;
    console.log("cambios -- >",cambios)
    const habitacionUpdate = await Habitacion.update(
      {
        nombre,
        cantCamas:Number(cantCamas),
        comodidades,
        privada,
        banoPrivado,
        tipo,
        precioHabitacion:Number(precioHabitacion),
        descripcion,
        imagenes,
      },
      { where: {id} }
    );

    if (!habitacionUpdate) {
      throw boom.notFound('habitacion no encontrada');
    }
    return habitacionUpdate;
  }

  // eslint-disable-next-line class-methods-use-this
  async borrar(id) {
    const habitacionDelete = await  Habitacion.destroy({where: { id: id}})
    await Cama.destroy({where: { HabitacionId: id}})
    if(!habitacionDelete) {
      throw boom.notFound('habitacion no encontrada');
    }
    return `Habitacion con id: ${id} fue borrada con exito`;
  }

} 

module.exports = habitacionesService;
