const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');
const { Imagen } = require('../db/models/imagen.model');
const { ReservaCama } = require('../db/models/reservaCama.model');


class habitacionesService {
  async crear(data) {
    console.log(data.imagenes);
    if (data.privada === true) {
      try {
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

      } catch(error) {
        return boom.conflict(error.parent.detail)
      }
    } else {
      try {

        let precioHabitacion = 0;
        if(data.preciosCamas.length > 1 && data.preciosCamas.length !== data.cantCamas ){
          return boom.badData('falta precio de una cama')}

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
            precio:
              data.preciosCamas.length > 1
                ? data.preciosCamas[i]
                : data.preciosCamas[0],
          })
            .then((cama) => {
              habitacion.setCamas(cama);
            })
            .catch((error) => boom.badData(error.message));
        }
        return habitacion;
      } catch (error) {
        return boom.conflict(error.parent.detail);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async buscar() {

    try {

    const habitacion = await Habitacion.findAll({
      include: [{model:Imagen, attributes: [ 'imagen' ] },{model:Cama, attributes: [ 'id', 'precio', 'estado' ] }]
    });
    for (let i = 0; i < habitacion.length; i++) {
      if (habitacion[i].privada === true) {delete habitacion[i].dataValues.Camas}
      if (habitacion[i].Imagens.length<0) {habitacion[i].dataValues.Imagens.push("https://w7.pngwing.com/pngs/331/812/png-transparent-bedroom-computer-icons-bed.png")}
      }
      return habitacion;
    } catch (error) {
      return boom.badData(error);
    }
  }

  
  // eslint-disable-next-line class-methods-use-this
  async buscaruno(id) {
    
    let habitacion = Habitacion.findByPk(id);
    if (!habitacion.id) {return boom.notFound('no exite la habitacion')}
    if (!habitacion.privada) {
      habitacion = Habitacion.findByPk(id, {
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

    const habitacionUpdate = await Habitacion.update(
      {
        nombre,
        cantCamas,
        comodidades,
        privada,
        banoPrivado,
        tipo,
        precioHabitacion,
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
