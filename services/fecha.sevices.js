const boom = require('@hapi/boom');
const { Fecha } = require('../db/models/fecha.model');
const { Habitacion} = require('../db/models/habitacion.model')



class FechaServices {
    
    async crear(data){
    try {
    const checkin = Date.parse(data.checkin)
    const checkout = Date.parse(data.checkout)
    const atabla = await Fecha.create({
        checkin,
        checkout,
        rango:[{value:checkin, inclusive: true}, {value:checkout, inclusive:true} ]
    })
    return atabla
    } catch(error) {
        return boom.badData(error)
          }
    }

    async mostrarTodo() {
        const fechas =  await Fecha.findAll()
        return fechas;
      }

      async constultarango(data) {
        const ingreso = Date.parse(data.ingreso)
        const egreso = Date.parse(data.egreso)
        const fechas =  await Fecha.findAll()
        console.log(fechas[0].checkin)
        const log = []
        if (fechas.length){
        for (let i = 0; i < fechas.length; i++){
            if (ingreso >= fechas[i].checkin && ingreso <= fechas[i].checkout ) {
                 log.push(false)
            }
            
        }}else{
            log.push(true)
        }
        let message = ''
        log.includes(false) ? message = 'no disponible' : message = 'disponible'
        return message
      }


      async constultadisponibe(data) {
        const ingreso = Date.parse(data.ingreso)
        const egreso = Date.parse(data.egreso)
        const habitacion = await Habitacion.findByPk(data.idHabitacion)
        console.log(habitacion)
        const fechas =  await Fecha.findAll()
        console.log(fechas[0].checkin)
        const log = []
        if (fechas.length){
        for (let i = 0; i < fechas.length; i++){
            if (ingreso >= fechas[i].checkin && ingreso <= fechas[i].checkout ) {
                 log.push(false)
            }
            
        }}else{
            log.push(true)
        }
        let message = ''
        log.includes(false) ? message = 'no disponible' : message = 'disponible'
        return message
      }
}

module.exports = FechaServices;