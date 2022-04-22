const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { Imagen } =  require('../db/models/imagen.model')



class ImagenService {

  async mostrarTodo() {
    try {
      const imagenes = Imagen.findAll();
      return imagenes
    } catch(error) {
      return boom.notFound('no hay imagenes disponibles')
    }
    
  }

  async buscarPorId(id) {
    try {
      
    } catch(error) {
      
    }
  }

  async crear(id, imagen) {
    try {
      if(imagen.length<1) {
        const imagen = Imagen.create
      }

    } catch(error) {
      
    }
   }



  async mostrarByHab() {
    
  }

  async actualizar() {
    
  }

  async delete() {
  
}

}

module.exports = ImagenService;
