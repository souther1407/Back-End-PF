const boom = require('@hapi/boom');
const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');
const { Huesped } = require('../db/models/huesped.model');
const { Nacionalidades } = require('../db/models/nacionalidad.model');
const { TipoDocumento } = require('../db/models/tipoDocumento.model');

class huespedServices {

    async mostrarTodo(){
        const huespedes = await Huesped.findAll({include: [{model: Cama}, {model: Habitacion}]})
        return huespedes
    }

    //TODO: modificar logica: tipo dni es enum ahora
    async crearHuesped(data){
        const huesped = await Huesped.findByPk(data.dni)
        if(huesped){
            throw  boom.badRequest({msg : 'Este huesped ya existe en la bd'})
        }else{
            const createdHuesped = await Huesped.create(data)
            const tipoDocu = await TipoDocumento.create({nombre: data.tipoDocumento})
            const nacionalidad = await Nacionalidades.create({nombre: data.nacionalidad})
            createdHuesped.setTipoDocumento(tipoDocu)
            createdHuesped.setNacionalidade(nacionalidad)
            return createdHuesped
        }
    }

    async eliminarHuesped(id){
        const huesped = await Huesped.destroy({where: {dni: id}})
        if(!huesped){
            throw boom.notFound('no existe el huesped que intenta eliminar')
        }
        return huesped
    }

    async actualizarHuesped(cambios){
        const { nombre, apellido, genero, dni } = cambios
        const checkHuesped = await Huesped.findByPk(dni)
        if(!checkHuesped){
            throw boom.notFound('el huespe que intenta modificar no existe')
        }
        const huespedUpdate = Huesped.update(
            {
            nombre,
            apellido,
            genero
        },
            { where: {dni : dni}}
        )
        if(!huespedUpdate) {
            throw boom.notFound('no se pudo actualizar');
        }
        return huespedUpdate
    }
    async detalleHuesped(id){
        const huesped = await Huesped.findByPk(id)
        if(!huesped){
            throw boom.notFound('no existe el huesped solicitado')
        }
        return huesped;
    }
}

module.exports = huespedServices;