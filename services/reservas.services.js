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


//servicios
const huespedServices = require('./huesped.sevices');

const serviceHuesped = new huespedServices

class ReservaService {

    async mostrarReservasByFecha(ingreso, egreso) {
        const ingresoFecha = ingreso
        const egresoFecha = egreso
        if(ingreso >= egreso) {
            throw boom.badData('la fecha de ingreso no puede ser mayor que la de egreso')
        }
        const reservas = await ReservaCama.findAll(
            {
                include: [
                    {
                        model: Usuario,
                        attributes: ['dni', "nombre", "apellido"],
                        
                    },
                    {
                        model: Habitacion,
                        attributes: ['id','nombre'],
                        through: {attributes: []}
                    },
                    {
                        model: Cama,
                        attributes: ['id','nombre','HabitacionId'],
                        through: {attributes: []}

                    } 

                ],
                where: {
                    [Op.or]: [
                        {[Op.and]: [
                            {fecha_ingreso: {
                            [Op.gte]: ingresoFecha
                            }},             
                            {fecha_egreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_ingreso: {
                                [Op.lte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.gte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_egreso: {
                                [Op.gte]: egresoFecha
                                }},
                            {fecha_ingreso: {
                                [Op.gte]: ingresoFecha
                            }},
                            {fecha_ingreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_ingreso: {
                                [Op.lte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.gte]: egresoFecha
                            }}
                        ]},
                        {fecha_ingreso: {
                            [Op.between]: [ingresoFecha, egreso]
                        }},
                    ]
                }
            })

        // if (!reservas.length) {
        //     return boom.badData('no hay reservas registradas')
        // }
        // const reservasFiltradas = reservas.filter(r =>
        //     (r.fecha_ingreso >= ingresoFecha && r.fecha_ingreso <= egresoFecha)
            // ||
            // (
            //     (r.fecha_ingreso < ingreso && r.fecha_egreso >= ingreso && r.fecha_egreso <= egreso)
            //     ||
            //     (r.fecha_egreso > egreso && r.fecha_ingreso > ingreso && r.fecha_ingreso <= egreso))
        // )
        return reservas
    }

    async mostrar() {
        const reservas = await ReservaCama.findAll({
            include:
                [{
                    attributes: ['id', 'nombre'],
                    model: Habitacion,
                    through: { attributes: [] }
                },
                {
                    attributes: ["HabitacionId", 'id', 'nombre'],
                    model: Cama,
                    through: { attributes: [] }
                },
                ]
        })
        if (!reservas.length) {
            return boom.badData('no hay reservas registradas')
        } else {

            return reservas
        }
    }

    async crearReserva(data, token) {
        const tokenInfo = token.split(' ')
        const tokendec = jwt.decode(tokenInfo[1])
        const checkUs = await Usuario.findByPk(tokendec.sub)
        if(!checkUs){
            throw boom.badData('el usuario no existe')
        }
        console.log("data en crear reserva",data);
        let cama;
        let habitacion;

        if(data.camas){
            for (let i = 0; i < data.camas.length; i++) {
                cama = await Cama.findByPk(data.camas[i])
                if(!cama) { throw boom.notFound(`no existe la cama con id ${data.camas[i]}`)}
            }
        }
        if(data.habitaciones){
            for (let i = 0; i < data.habitaciones.length; i++){
                habitacion = await Habitacion.findByPk(data.habitaciones[i])
                if(!habitacion) { 
                    throw boom.notFound(`no existe la habitacion con id ${data.habitaciones[i]}`)}
            }
        }
        const newReserva = await ReservaCama.create({
            fecha_ingreso: data.fecha_ingreso,
            fecha_egreso: data.fecha_egreso,
            saldo: data.saldo
        })
        if (data.camas) {
            for (let i = 0; i < data.camas.length; i++) {
                Cama.findByPk(data.camas[i])
                .then(cama => {
                    newReserva.addCama(cama)
                })
                .catch(error => { 
                    throw boom.badData(error)})
            }
        }
        if(! data.habitaciones){
            throw boom.badData('Estas mandando un id de una habitación compartida')
            }else{
            for (let i = 0; i < data.habitaciones.length; i++) {
                if(habitacion.dataValues.privada){
                    await Habitacion.findByPk(data.habitaciones[i])
                    .then(habitacion =>{
                        newReserva.addHabitacion(habitacion)
                    }).catch(error => {throw boom.badData(error)})
                }
            }
        }
        await Usuario.findByPk(tokendec.sub)
        .then(user =>{
            newReserva.setUsuario(user)
        })
        return newReserva
    }

    async eliminarReserva(id) {
        const reserva = await ReservaCama.destroy({ where: { id } })
        if (!reserva) {
            throw boom.notFound('Reserva no encontrada')
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
            throw boom.notFound({ msg: 'La reserva que intentas buscar no existe' })
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
            throw boom.badData('Cantidad de huespedes no coincide con cantidad de camas disponibles')
        }
        if (reserva.Camas.length) {
            for (let i = 0; i < reserva.Camas.length; i++) {
               await Cama.findByPk(reserva.Camas[i].id)
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

    async mostrardisponibilidad(data) {
        try {
            const { ingreso, egreso } = data
            const ingresoFecha= new Date(ingreso)
            const egresoFecha= new Date(egreso)
            if(ingresoFecha > egresoFecha) {
                throw boom.badData('La fecha de ingreso no puede ser mayor a la fecha de egreso')}

            const reservas = await ReservaCama.findAll({
                where: {
                    [Op.or]: [
                        {[Op.and]: [
                            {fecha_ingreso: {
                            [Op.gte]: ingresoFecha
                            }},             
                            {fecha_egreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_ingreso: {
                                [Op.lte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.gte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_egreso: {
                                [Op.gte]: egresoFecha
                                }},
                            {fecha_ingreso: {
                                [Op.gte]: ingresoFecha
                            }},
                            {fecha_ingreso: {
                                [Op.lte]: egresoFecha
                            }}
                        ]},
                        {[Op.and]: [
                            {fecha_ingreso: {
                                [Op.lte]: ingresoFecha
                            }},
                            {fecha_egreso: {
                                [Op.gte]: egresoFecha
                            }}
                        ]},
                        {fecha_ingreso: {
                            [Op.between]: [ingresoFecha, egresoFecha]
                        }},
                    ]
                },
                include: [
                    {
                        attributes: ['id'],
                        model: Habitacion,
                        through: { attributes: [] }
                    },
                    {
                        attributes: ['HabitacionId', 'id', 'nombre'],
                        model: Cama,
                        through: { attributes: [] }
                    }
                ],
            })

            let habitacionesOcupadas = [];
            let camasOcupadas = [];
            let disponibles = [];

            reservas.map(r =>{
                if(r.Habitacions.length) r.Habitacions.map(h =>{
                    habitacionesOcupadas.push(h.id)
                })
                if (r.Camas.length) r.Camas.map(c => {
                    camasOcupadas.push(c.id)
                })
            })
            let habitaciones = await Habitacion.findAll({where: {privada: true}, attributes: ['id', 'nombre']})
            
            for (let i = 0; i < habitaciones.length; i++) {
                if (!habitacionesOcupadas.includes(habitaciones[i].id)) disponibles.push({ idHabitacion: habitaciones[i].id, nombreHabitacion: habitaciones[i].nombre })
            }

            let habitacionCompletamenteOupada = []
            
            for (let i = 0; i < camasOcupadas.length; i++) {
                
                let camasdisponibles = []
                const datosCama = await Cama.findByPk(camasOcupadas[i]);
                let habitacionCama = await Habitacion.findByPk(datosCama.HabitacionId, { include: [{ model: Cama }] });
                let camasHabitacion = []
                for (const cama of habitacionCama.Camas) {
                    camasHabitacion.push({ camaNombre: cama.nombre, camaId: cama.id, })
                }

                for (let c = 0; c < camasHabitacion.length; c++) {
                    let toggle = false
                    for (let j = 0; j < camasOcupadas.length; j++) {
                        if(camasHabitacion[c].camaId === camasOcupadas[j]){
                            toggle = true
                        }
                    }
                    if(!toggle){
                        camasdisponibles.push({camaNombre: camasHabitacion[c].camaNombre, camaId: camasHabitacion[c].camaId, })
                    }
                }

                if(camasdisponibles.length !== 0){
                    let handle = false
                    for (let k = 0; k < disponibles.length; k++) {
                        if(disponibles[k].idHabitacion === habitacionCama.id){
                            handle = true;
                        }
                    }
                    if(!handle){
                        disponibles.push({
                            idHabitacion: datosCama.HabitacionId, 
                            cantidadCamas: habitacionCama.cantCamas, 
                            camasDisponible: camasdisponibles.length,
                            camasDisponiblesIds: [...camasdisponibles]
                        })
                    }
                }
                if(camasdisponibles.length === 0){
                    habitacionCompletamenteOupada.push(datosCama.HabitacionId)
                }
            }
            
            let habitacionesCompartidas = await Habitacion.findAll({where: {privada: false}, attributes:['id','cantCamas'] ,include: [{model: Cama, attributes: ['id', 'nombre']}]})
            
            
            for (let i = 0; i < habitacionesCompartidas.length; i++) {
                let incluye = false;
                
                if(disponibles.length === 0 && !habitacionCompletamenteOupada.includes(habitacionesCompartidas[i].id)){
                    disponibles.push({
                        idHabitacion: habitacionesCompartidas[i].id, 
                        cantidadCamas: habitacionesCompartidas[i].cantCamas, 
                        camasDisponible: habitacionesCompartidas[i].cantCamas,
                        camasDisponiblesIds: habitacionesCompartidas[i].Camas.map(c => ({camaNombre: c.nombre, camaId: c.id, }))
                    })
                }
                console.log('habitacion completamente ocupada',habitacionCompletamenteOupada)
                for (let j = 0; j < disponibles.length; j++) {
                    
                    if(disponibles[j].idHabitacion === habitacionesCompartidas[i].id || habitacionCompletamenteOupada.includes(habitacionesCompartidas[i].id)) { 
                        incluye = true
                        continue;
                    } else if (j === disponibles.length - 1 && incluye === false) {
                        disponibles.push({
                            idHabitacion: habitacionesCompartidas[i].id,
                            cantidadCamas: habitacionesCompartidas[i].cantCamas,
                            camasDisponible: habitacionesCompartidas[i].cantCamas,
                            camasDisponiblesIds: habitacionesCompartidas[i].Camas.map(c => ({ camaNombre: c.nombre, camaId: c.id, }))
                        })
                    }
                }
            }

            console.log(disponibles)
            return disponibles


        } catch (error) {
            console.log(error)
            return error;
        }
    }
// creando un pull 
    async mostrardisponibilidadById(data){
        
            const { id } = data
            console.log(id)
            const reservas = await ReservaCama.findByPk(id, {
                include: [

                    { model: Cama, attributes: ['id', 'nombre'], through: { attributes: [] } },
                    { model: Habitacion, attributes: ['id', 'nombre', 'cantCamas'], through: { attributes: [] } }
                ]
            })
            if(!reservas){
                throw boom.notFound('no existen reservas')
            }
            return reservas
}


}

module.exports = ReservaService;