const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { ReservaCama } = require('../db/models/reservaCama.model')
const { Huesped } = require('../db/models/huesped.model')
const { Usuario } = require('../db/models/usuario.model')
const { Cama } = require('../db/models/cama.model')
const { Habitacion } = require('../db/models/habitacion.model')
const jwt = require('jsonwebtoken');
const { config } = require('../config/config')
const { Op } = require('sequelize');
const { isNumber } = require('util');

//servicios
const huespedServices = require('./huesped.sevices')
const serviceHuesped = new huespedServices

class ReservaService {

    async mostrarReservasByFecha(ingreso, egreso) {

        const reservas = await ReservaCama.findAll(
            {
                include: [
                    {
                        model: Habitacion,
                    },
                    {
                        model: Cama
                    }
                ]
            })
            
        if(!reservas.length) {
            return boom.badData('no hay reservas registradas')
        }
        const reservasFiltradas = reservas.filter(r =>
            (r.fecha_ingreso >= ingreso && r.fecha_ingreso <= egreso)
            ||
            (
                (r.fecha_ingreso < ingreso && r.fecha_egreso >= ingreso && r.fecha_egreso <= egreso)
                ||
                (r.fecha_egreso > egreso && r.fecha_ingreso > ingreso && r.fecha_ingreso <= egreso))
        )
        return reservasFiltradas
    }

    async mostrar() {
        const reservas = await ReservaCama.findAll({
            include: 
            [{
                attributes: ['id'],
                model: Habitacion,
                through: {attributes: []} 
            },
            {
                attributes: [ "HabitacionId",'id'],
                model: Cama,
                through: {attributes: []}
            },
            ]
        })
        return reservas
    }
    
    async crearReserva(data, token){
        const tokenInfo = token.split(' ')
        const tokendec = jwt.decode(tokenInfo[1])

        try {
            const newReserva = await ReservaCama.create({
                fecha_ingreso: data.fecha_ingreso,
                fecha_egreso: data.fecha_egreso,
                saldo: data.saldo
            })
            if(data.camas){
                for (let i = 0; i < data.camas.length; i++) {
                    const cama = await Cama.findByPk(data.camas[i])
                    if(!cama) { return `no existe la cama con id ${data.camas[i]}`}
                    Cama.findByPk(data.camas[i])
                    .then(cama => {
                        newReserva.addCama(cama)
                    })
                    .catch(error => { return boom.badData(error)})
                }
            }
            if(data.habitaciones){
                for (let i = 0; i < data.habitaciones.length; i++) {
                    const habitacion = await Habitacion.findByPk(data.habitaciones[i])
                    if(!habitacion) { return `no existe la habitacion con id ${data.habitaciones[i]}`}
                    if(habitacion.dataValues.privada){
                        Habitacion.findByPk(data.habitaciones[i])
                        .then(habitacion =>{
                            newReserva.addHabitacion(habitacion)
                        }).catch(error => {return boom.badData(error)})
                    }else{
                        return 'Estas mandando un id de una habitación compartida'
                    }
                }
            }
        
    
            Usuario.findByPk(tokendec.sub)
            .then(user =>{
                newReserva.setUsuario(user)
            })
            return newReserva
        } catch (error) {
            console.log(error)
            return error
            
        }

    }

    async eliminarReserva(id) {
        const reserva = await ReservaCama.destroy({ where: { id } })
        if (!reserva) {
            boom.notFound('Reserva no encontrada')
        }
        return `La reserva con ID: ${id} se ha borrado con exito`
    }
    async actualizarReserva() {

    }
    async cargarHuespedes(data, id_reserva) {
        const huespedes = data
        const reserva = await ReservaCama.findOne({
            where: {
                id: id_reserva
            },
            include: [{ model: Cama }, { model: Habitacion }]
        })
        if (!reserva) {
            return boom.notFound({ msg: 'La reserva que intentas buscar no existe' })
        }
        //Calcular la cantidad de camas disponibles y que la cant de huespedes enviados sean correctos
        let cantDisponible = 0;
        if ((reserva.Habitacions.length) > 1 && reserva.Camas.length) {
            for (let i = 0; i < reserva.Habitacions.length; i++) {
                cantDisponible += reserva.Habitacions[i].cantCamas
            }
            cantDisponible += reserva.Camas.length
        } else if ((reserva.Habitacions.length) === 1 && reserva.Camas.length) {
            cantDisponible += reserva.Habitacions[0].cantCamas;
            cantDisponible += reserva.Camas.length
        } else if (reserva.Habitacions.length && !reserva.Camas.length) {
            for (let i = 0; i < reserva.Habitacions.length; i++) {
                cantDisponible += reserva.Habitacions[i].cantCamas;
            }
        } else if (!reserva.Habitacions.length && reserva.Camas.length) {
            cantDisponible += reserva.Camas.length
        }

        if ((cantDisponible - huespedes.length) !== 0) {
            return { msg: 'Cantidad de huespedes no coincide con cantidad de camas disponibles' }
        }
        if (reserva.Camas.length) {
            for (let i = 0; i < reserva.Camas.length; i++) {
                Cama.findByPk(reserva.Camas[i].id)
                    .then(async (cama) => {
                        try {
                            const findHuesped = await Huesped.findByPk(huespedes[i].dni)
                            if (!findHuesped) {
                                const huesped = await serviceHuesped.crearHuesped(huespedes.shift())
                                console.log(huesped)
                                cama.setHuesped(huesped)
                            }
                            cama.setHuesped(findHuesped)
                        } catch (error) {
                            console.log(error)
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
        if (reserva.Habitacions.length) {
            for (let i = 0; i < reserva.Habitacions.length; i++) {
                const cantHuesped = reserva.Habitacions[i].cantCamas
                for (let j = 0; j < cantHuesped; j++) {
                    Habitacion.findByPk(reserva.Habitacions[i].id)
                        .then(async (habitacion) => {
                            try {
                                const findHuesped = await Huesped.findByPk(huespedes[j].dni)
                                if (!findHuesped) {
                                    const huesped = await serviceHuesped.crearHuesped(huespedes.shift())
                                    habitacion.setHuespeds(huesped)
                                }
                                habitacion.setHuespeds(findHuesped)
                            } catch (error) {
                                console.log(error)
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                }
            }
        }
        return { msg: 'Huespedes Cargados' }
    }

    // async cargarHuespedes(data, id_reserva){
    //     const reserva = await ReservaCama.findOne({
    //         where: {
    //             id: id_reserva
    //         },
    //         include: Cama
    //     })
    //     for (let i = 0; i < reserva.Camas.length; i++) {
    //         Cama.findByPk(reserva.Camas[i].id)
    //         .then( async (cama) =>{
    //             const findUser = await Usuario.findOne({where: { id: data[i].dni}})
    //             if(!findUser){
    //                 const userCreated = await Usuario.create({
    //                     ...data,
    //                     tipoUsuario: 'huesped'
    //                 })
    //                 cama.setUsuario(userCreated)
    //             }
    //             cama.setUsuario(findUser)
    //         })
    //     }
    //     return 'Huespedes Cargados'
    // }

    async mostrardisponibilidad(data){
        try{
            const { fecha_ingreso, fecha_egreso } = data
            const reservas = await ReservaCama.findAll({
                include: [
                    {
                        attributes:['id'],
                        model: Habitacion,
                        through: {attributes: []}
                    },
                    {
                        attributes:['HabitacionId','id'],
                        model: Cama,
                        through: {attributes: []}
                    }
                ],
                where: {
                    fecha_ingreso: {
                        [Op.between]: [fecha_ingreso, fecha_egreso]
                    },
                }
            })

            let noDisponibles = [];
            let disponibles = [];

            reservas.map(r =>{
                if(r.Habitacions.length) r.Habitacions.map(h =>{
                noDisponibles.push(h.id)
                }) 
                if(r.Camas.length) r.Camas.map(c =>{
                noDisponibles.push(c.id)
                })
            })
            
            for (let i = 0; i < noDisponibles.length; i++) {
                if( typeof(noDisponibles[i]) !== 'number'){
                    const habitacionCama = await Cama.findByPk(noDisponibles[i]);
                    let habitacion = await Habitacion.findByPk(habitacionCama.HabitacionId);
                    if(!disponibles.length){
                        disponibles.push({
                            idHabitacion: habitacionCama.HabitacionId, 
                            cantidadCamas: habitacion.cantCamas, 
                            camasDisponible: habitacion.cantCamas,
                            camasDisponiblesIds: [noDisponibles[i]]
                        })
                    }
                    
                    for (let j = 0; j < disponibles.length; j++) {
                        if (disponibles[j].idHabitacion === habitacionCama.HabitacionId){
                            disponibles[j].camasDisponible--;
                            disponibles[j].camasDisponiblesIds.includes(noDisponibles[i]) ? null : disponibles[j].camasDisponiblesIds.push(noDisponibles[i]);
                        }else{
                            disponibles.push({
                                idHabitacion: habitacionCama.HabitacionId, 
                                cantidadCamas: habitacion.cantCamas, 
                                camasDisponible: habitacion.cantCamas,
                                camasDisponiblesIds: [...disponibles[i].camasDisponiblesIds, noDisponibles[i]]
                            })
                        }
                    }
                }
            }

            let habitaciones = await Habitacion.findAll({where: {privada: true}, attributes: ['id']})
            
            for (let i = 0; i < habitaciones.length; i++) {
                if(!noDisponibles.includes(habitaciones[i].id)) disponibles.push({idHabitacion: habitaciones[i].id})
            }

            let habitacionesCompartidas = await Habitacion.findAll({where: {privada: false}, attributes:['id','cantCamas'] ,include: [{model: Cama, attributes: ['id']}]})
            
            for (let i = 0; i < habitacionesCompartidas.length; i++) {
                let verificar = false;
                for (let j = 0; j < disponibles.length; j++) {
                    if(disponibles[j].idHabitacion === habitacionesCompartidas[i].id) { 
                        verificar = true
                        continue;
                    }else if(j === disponibles.length - 1 && verificar === false){
                        disponibles.push({
                            idHabitacion: habitacionesCompartidas[i].id, 
                            cantidadCamas: habitacionesCompartidas[i].cantCamas, 
                            camasDisponible: habitacionesCompartidas[i].cantCamas,
                            camasDisponiblesIds: habitacionesCompartidas[i].Camas.map(c => c.id)
                        })
                    }
                }
            }

            return disponibles


        }catch(error){
            console.log(error)
            return error;
        }
    }
// creando un pull 
    async mostrardisponibilidadById(data){
        try {
            const { id } = data
            console.log(id)
            const reservas = await Habitacion.findAll({
                where: { id },
                include: [{ model: Cama }]
            })
            return reservas
        } catch (error) {
            console.log(error)
            return error
        }
    }


}

module.exports = ReservaService;