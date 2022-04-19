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
            await Habitacion.update({cantCamas: cantCam}, {where: {id: cama.HabitacionId}})
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


    async borrarCama(id){
    
    const cama = await Cama.findByPk(id)
    if (!cama) {
     return boom.notFound('la cama no existe') }
    
    const habitacion = await Habitacion.findByPk(cama.HabitacionId)
    const camaBorrada = await Cama.destroy({where:{id}})
    const actHabit = await Habitacion.update(
    {cantCamas: habitacion.cantCamas - 1}, 
        {where:{id:cama.HabitacionId}} )
    
    //    const habitacion = await Habitacion.update()
       
       return camaBorrada;
        }

}




module.exports = camasServices;