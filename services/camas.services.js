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

    async traeruna(id){
        const camas = await Cama.findByPk(id)
        return camas
    }

    async crear(data){
    const {HabitacionId} = data
          
        //  const habitacion = Habitacion.findByPk(parseInt(HabitacionId))
        
            try {
            const cama = await Cama.create({
                precio: data.precio,
                HabitacionId: data.HabitacionId,
                })
                // Habitacion.addCamas(HabitacionId)
            let cantCam = await Cama.count({where: {HabitacionId}})
            await Habitacion.update({cantCama:cantCam})
            return cama
            } catch(error) {
        console.log(error)
        }
}


    // eslint-disable-next-line class-methods-use-this
    async actualizar(id, cambios){
        const { precio, estado } = cambios
        const camaUpdate = Cama.update({
            precio,
            estado
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