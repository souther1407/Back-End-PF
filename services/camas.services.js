const boom = require('@hapi/boom');

const { Cama } = require('../db/models/cama.model');
const { Habitacion } = require('../db/models/habitacion.model');

class camasServices {

    async mostrarTodas(){
        const newCama = await Cama.findAll({
            include: { 
                model: Habitacion, 
                attributes: ['id', 'nombre'] 
                }
            })
        return newCama
    }

    async mostrarByHabitacion(id){
        const camas = await Cama.findAll({where: { HabitacionId : id}})
        return camas
    }

    async actualizar(id, cambios){
        const { precio, estado } = cambios
        const camaUpdate = Cama.update({
            precio: precio,
            estado: estado
        },
            { where: {id : id}}
        )
        if(!camaUpdate) {
            throw boom.notFound('cama no encontrada');
        }
        return 'Cama actualizada';
    }
}

module.exports = camasServices;