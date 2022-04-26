const boom = require('@hapi/boom');
const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');
const { Huesped } = require('../db/models/huesped.model');
const { Nacionalidades } = require('../db/models/nacionalidad.model');
const { TipoDocumento } = require('../db/models/tipoDocumento.model');

class huespedServices {

    async mostrarTodo(){
        const huespedes = await Huesped.findAll({include: [{model: Cama}, {model: Habitacion}, {model: Habitacion}, {model: Cama}]})
        return huespedes
    }

    async crearHuesped(data){
        const huesped = await Huesped.findByPk(data.dni)
        if(!huesped){
            const createdHuesped = await Huesped.create(data)
            const tipoDocu = await TipoDocumento.create({nombre: data.tipoDocumento})
            const nacionalidad = await Nacionalidades.create({nombre: data.nacionalidad})
            createdHuesped.setTipoDocumento(tipoDocu)
            createdHuesped.setNacionalidade(nacionalidad)
            return createdHuesped
        }
        return  boom.badRequest({msg : 'Este huesped ya existe en la bd'})

    }

    async eliminarHuesped(id){
        const huesped = await Huesped.destroy({where: {dni: id}})
        return huesped
    }

    async actualizarHuesped(cambios){
        const { nombre, apellido, genero, dni } = cambios
        const huespedUpdate = Huesped.update(
            {
            nombre,
            apellido,
            genero
        },
            { where: {dni : dni}}
        )
        if(!huespedUpdate) {
            throw boom.notFound('huesped no encontrada');
        }
        return huespedUpdate
    }
}

module.exports = huespedServices;