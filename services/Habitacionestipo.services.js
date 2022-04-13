const boom = require('@hapi/boom');

const { sequelize } = require('../libs/sequelize')
const { Habitacion } =  require('../db/models/habitacion.model')

class habitacionTipoService {

  async crear() {
    
  }

  async mostrarTodo() {
    
  }

  // eslint-disable-next-line class-methods-use-this
  // eslint-disable-next-line consistent-return
  async mostrarBytipo(tipo) {
    if(tipo === 'privada'){
    try {
        const habitaciones = await Habitacion.findAll({where:{privada: true}})
        return habitaciones
    } catch(error) {
        return error

    }} else if(tipo === 'compartida'){
      try {
        const habitaciones = await Habitacion.findAll({where:{privada:false}})
        return habitaciones
      } catch(error) {
        return error
      }
    }
  }

  async mostrarBybano(bano) {
    if(bano === 'privado'){
    try {
        const habitaciones = await Habitacion.findAll({where:{banoPrivado: true}})
        return habitaciones
    } catch(error) {
        return error

    }} else if(bano === 'compartido'){
      try {
        const habitaciones = await Habitacion.findAll({where:{banoPrivado:false}})
        return habitaciones
      } catch(error) {
        return error
      }
    }
  }

  async mostrarByhabBan(tipo, bano) {
    const habitaciones =await this.mostrarBytipo(tipo)
    let booleano = ''
    bano === 'privado' ? booleano = true : booleano = false; 
    const habitacionesBano = await habitaciones.filter(habitacion => habitacion.banoPrivado === booleano);
    return habitacionesBano;
  }

  async delete() {
    
    
  }

}

module.exports = habitacionTipoService