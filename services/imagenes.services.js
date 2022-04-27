const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { Imagen } =  require('../db/models/imagen.model')



class ImagenService {

  async mostrarTodo() {
    const imagenes = await Imagen.findAll();
      if(!imagenes) {
        throw boom.notFound('no hay imagenes disponibles')
      }
      return imagenes 
  }

  async buscarPorId(id) {
    
  }

  async crear(id, imagen) {

  }



  async mostrarByHab() {
    
  }

  async actualizar() {
    
  }

  async delete() {
  
}

}

module.exports = ImagenService;
