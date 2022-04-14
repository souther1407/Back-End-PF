const boom = require('@hapi/boom');
const { Cama } = require('../db/models/cama.model');
const { Huesped } = require('../db/models/huesped.model')

class huespedServices {

    async mostrarTodo(){
        const huespedes = await Huesped.findAll({include: Cama})
        return huespedes
    }
}

module.exports = huespedServices;