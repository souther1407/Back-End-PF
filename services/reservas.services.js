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

const {plantillaEmailReserva} = require('../utils/PlantillasEmail')
const {enviarEmail} = require('../utils/mailer')

//servicios
const huespedServices = require('./huesped.sevices');
const { Pago } = require('../db/models/pago.model');

const serviceHuesped = new huespedServices

class ReservaService {

    async mostrarReservasByFecha(ingreso, egreso) {
        const ingresoFecha = ingreso
        const egresoFecha = egreso
        if (ingreso >= egreso) {
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
                        attributes: ['id', 'nombre'],
                        include: [{
                            model: Huesped,
                            attributes: ['dni', 'nombre', 'apellido'],
                            // through: { attributes: ['Huesped_Habitacion']}
                        }],
                        through: { attributes: [] }
                    },
                    {
                        model: Cama,
                        attributes: ['id', 'nombre', 'HabitacionId'],
                        include: [{
                            model: Huesped,
                            attributes: ['dni', 'nombre', 'apellido'],
                            // through: { attributes: ['Huesped_Habitacion']}
                        }],
                        through: { attributes: [] }

                    }

                ],
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_egreso: {
                                        [Op.gte]: egresoFecha
                                    }
                                },
                                {
                                    fecha_ingreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.gte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            fecha_ingreso: {
                                [Op.between]: [ingresoFecha, egreso]
                            }
                        },
                    ]
                }
            })
        return reservas
    }

    async mostrar() {
        const reservas = await ReservaCama.findAll({
            include:
                [{
                    attributes: ['id', 'nombre'],
                    model: Habitacion,
                    include: [{
                        model: Huesped,
                        attributes: ['dni', 'nombre', 'apellido'],
                        // through: { attributes: ['Huesped_Habitacion']}
                    }],
                    through: { attributes: [] }
                },
                {
                    attributes: ["HabitacionId", 'id', 'nombre'],
                    model: Cama,
                    include: [{
                        model: Huesped,
                        attributes: ['dni', 'nombre', 'apellido'],
                        // through: { attributes: ['Huesped_Habitacion']}
                    }],
                    through: { attributes: [] }
                },
                {
                    model: Usuario,
                    attributes: ['dni', 'nombre', 'apellido']
                }]
        })
        if (!reservas.length) {
            return boom.badData('no hay reservas registradas')
        } else {

            return reservas
        }
    }

    async crearReserva(data, token, pagoId) {
        const tokenInfo = token.split(' ')
        const tokendeca = jwt.decode(tokenInfo[1])
        const tokendec = tokendeca.sub
        console.log('soy el tokendec--------->', tokendec)
        const checkUs = await Usuario.findByPk(tokendec)
        if (!checkUs) {
            throw boom.badData('el usuario no existe')
        }
        
        let cama;
        let habitacion;

        if (data.camas) {
            for (let i = 0; i < data.camas.length; i++) {
                cama = await Cama.findByPk(data.camas[i])
                if (!cama) { throw boom.notFound(`no existe la cama con id ${data.camas[i]}`) }
            }
        }
        if (data.habitaciones) {
            for (let i = 0; i < data.habitaciones.length; i++) {
                habitacion = await Habitacion.findByPk(data.habitaciones[i])
                if (!habitacion) {
                    throw boom.notFound(`no existe la habitacion con id ${data.habitaciones[i]}`)
                }
            }
        }
        const newReserva = await ReservaCama.create({
            fecha_ingreso: data.fecha_ingreso,
            fecha_egreso: data.fecha_egreso,
            saldo: data.saldo,
            UsuarioDni: tokendec
        })
        if (data.camas) {
            for (let i = 0; i < data.camas.length; i++) {
                await Cama.findByPk(data.camas[i])
                    .then(cama => {
                        newReserva.addCama(cama)
                    })
                    .catch(error => {
                        throw boom.badData(error)
                    })
            }
        }
        if (!data.habitaciones) {
            throw boom.badData('Estas mandando un id de una habitación compartida')
        } else {
            for (let i = 0; i < data.habitaciones.length; i++) {
                if (habitacion.dataValues.privada) {
                    await Habitacion.findByPk(data.habitaciones[i])
                        .then(habitacion => {
                            newReserva.addHabitacion(habitacion)
                        }).catch(error => { throw boom.badData(error) })
                }
            }
        }
        let pago = await Pago.findByPk(pagoId)
        if(!pago){
            throw boom.notFound('Pago no encontrado')
        }
        await newReserva.addPago(pago)

        await Usuario.findByPk(tokendec)
            .then( user => {
                newReserva.setUsuario(user)
            })
            const usamail = await Usuario.findByPk(tokendec)
            const mail = {
                from: 'WebMaster',
                to: `${usamail.email}`, 
                subject: "hemos registrado su reserva",
                html: plantillaEmailReserva(usamail.nombre, 
                                            usamail.apellido, 
                                            data.fecha_ingreso, 
                                            data.fecha_egreso,
                                            newReserva.saldo, 
                                            data.camas, 
                                            data.habitaciones),
            } 
            const enviaremail = enviarEmail(mail)
        return newReserva
    }

    async crearReservaRecepcion(data) {
      
            const { camas,
                habitaciones,
                saldo,
                ingreso,
                egreso,
                nombre,
                apellido,
                tipoDoc,
                numDoc,
                fechaNac,
                nacionalidad,
                email,
                genero } = data

            //Comprueba que los productos existen
            if (camas) {
                for (let i = 0; i < camas.length; i++) {
                    const cama = await Cama.findByPk(camas[i])
                    if (!cama) { throw boom.notFound(`no existe la cama con id ${camas[i]}`) }
                }
            }
            if (habitaciones) {
                for (let i = 0; i < habitaciones.length; i++) {
                    const habitacion = await Habitacion.findByPk(habitaciones[i])
                    if (!habitacion) {
                        throw boom.notFound(`no existe la habitacion con id ${habitaciones[i]}`)
                    }
                }
            }
            if (camas.length === 0 && habitaciones.length === 0) {
                throw boom.badImplementation('no puedes crear una reserva sin producto')
            }
            //Comprueba si ya existe un usuario con ese dni sino se crea uno nuevo
            const user = await Usuario.findByPk(numDoc)
            let newUser = '';
            if (!user) {
                newUser = await Usuario.create({
                    dni: numDoc,
                    nombre: nombre,
                    apellido: apellido,
                    tipoDocumento: tipoDoc,
                    nacionalidad: nacionalidad,
                    fechaNacimiento: fechaNac,
                    email: email,
                    password: numDoc,
                    genero: genero
                })
            }
            //Creacion de la reserva
            const newReserva = await ReservaCama.create({
                fecha_ingreso: ingreso,
                fecha_egreso: egreso,
                saldo: saldo
            })

            if (camas) {
                for (let i = 0; i < camas.length; i++) {
                    await Cama.findByPk(camas[i])
                        .then(cama => {
                            newReserva.addCama(cama)
                        })
                        .catch(error => {
                            throw boom.badData(error)
                        })
                }
            }
            if (habitaciones) {
                for (let i = 0; i < habitaciones.length; i++) {
                    await Habitacion.findByPk(habitaciones[i])
                        .then(habitacion => {
                            newReserva.addHabitacion(habitacion)
                        })
                        .catch(error => {
                            throw boom.badData(error)
                        })
                }
            }
            //Asociacion usuario con reserva
            if (!user) {
                newReserva.setUsuario(newUser)
            } else {
                newReserva.setUsuario(user)
            }
            const mail = {
                from: 'WebMaster',
                to: `${email}`, 
                subject: "hemos registrado su reserva",
                html: plantillaEmailReserva(nombre, apellido, ingreso, egreso, saldo, camas, habitaciones  ),
            } 
            const enviaremail = enviarEmail(mail)
            return { msg: 'La reserva fue creada con exito' }
       
    }

    async eliminarReserva(id) {
        const reserva = await ReservaCama.destroy({ where: { id } })
        if (!reserva) {
            throw boom.notFound('Reserva no encontrada')
        }
        return `La reserva con ID: ${id} se ha borrado con exito`
    }

    async actualizarReserva(data) {
        const { id_reserva, id_producto, huesped, estado, saldo } = data;
        //Modificar el saldo
        if (saldo) {
            try {
                if (typeof saldo !== 'number') {
                    throw boom.badData('el saldo debe ser un numero')
                }
                const reserva = await ReservaCama.findByPk(id_reserva)
                if (!reserva) {
                    throw boom.notFound('La reserva no existe')
                } else {
                    await reserva.update({ saldo })
                }
            } catch (error) {
                throw boom.badData(error)
            }
        }
        //Modificar estado de reserva
        if (estado) {
            try {
                if (!id_reserva) {
                    throw boom.badData('Sin id de reserva no se puede actualizar el estado')
                }
                const reserva = await ReservaCama.findByPk(id_reserva)
                if (!reserva) {
                    throw boom.notFound('La reserva no existe')
                } else {
                    await reserva.update({ estado })
                }
            } catch (error) {
                throw boom.badData(error)
            }
        }
        //Cargar huesped
        if (huesped) {
            if (id_producto.length < 10) {
                try {
                    const habitacion = await Habitacion.findByPk(id_producto)
                    const findHuesped = await Huesped.findByPk(huesped.dni)
                    if (!habitacion) {
                        throw boom.notFound('La habitacion no existe')
                    }
                    if (!findHuesped) {
                        const huespedCreated = await Huesped.create(huesped)
                        habitacion.addHuesped(huespedCreated)
                    } else {
                        habitacion.addHuesped(findHuesped)
                    }
                } catch (error) {
                    throw boom.badData(error)
                }
            }
            if (id_producto.length > 10) {
                try {
                    const cama = await Cama.findByPk(id_producto)
                    const findHuesped = await Huesped.findByPk(huesped.dni)
                    if (!cama) {
                        throw boom.notFound('La habitacion no existe')
                    }
                    if (!findHuesped) {
                        const huespedCreated = await Huesped.create(huesped)
                        cama.setHuesped(huespedCreated)
                    } else {
                        cama.setHuesped(findHuesped)
                    }
                } catch (error) {
                    throw boom.badData(error)
                }
            }
        }
        return 'Reserva actualizada'
    }

    async mostrardisponibilidad(data) {
        try {
            const { ingreso, egreso } = data
            const ingresoFecha = new Date(ingreso)
            const egresoFecha = new Date(egreso)
            if (ingresoFecha > egresoFecha) {
                throw boom.badData('La fecha de ingreso no puede ser mayor a la fecha de egreso')
            }

            const reservas = await ReservaCama.findAll({
                where: {
                    [Op.or]: [
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_egreso: {
                                        [Op.gte]: egresoFecha
                                    }
                                },
                                {
                                    fecha_ingreso: {
                                        [Op.gte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            [Op.and]: [
                                {
                                    fecha_ingreso: {
                                        [Op.lte]: ingresoFecha
                                    }
                                },
                                {
                                    fecha_egreso: {
                                        [Op.gte]: egresoFecha
                                    }
                                }
                            ]
                        },
                        {
                            fecha_ingreso: {
                                [Op.between]: [ingresoFecha, egresoFecha]
                            }
                        },
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

            reservas.map(r => {
                if (r.Habitacions.length) r.Habitacions.map(h => {
                    habitacionesOcupadas.push(h.id)
                })
                if (r.Camas.length) r.Camas.map(c => {
                    camasOcupadas.push(c.id)
                })
            })
            let habitaciones = await Habitacion.findAll({ where: { privada: true }, attributes: ['id', 'nombre'] })

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
                        if (camasHabitacion[c].camaId === camasOcupadas[j]) {
                            toggle = true
                        }
                    }
                    if (!toggle) {
                        camasdisponibles.push({ camaNombre: camasHabitacion[c].camaNombre, camaId: camasHabitacion[c].camaId, })
                    }
                }

                if (camasdisponibles.length !== 0) {
                    let handle = false
                    for (let k = 0; k < disponibles.length; k++) {
                        if (disponibles[k].idHabitacion === habitacionCama.id) {
                            handle = true;
                        }
                    }
                    if (!handle) {
                        disponibles.push({
                            idHabitacion: datosCama.HabitacionId,
                            cantidadCamas: habitacionCama.cantCamas,
                            camasDisponible: camasdisponibles.length,
                            camasDisponiblesIds: [...camasdisponibles]
                        })
                    }
                }
                if (camasdisponibles.length === 0) {
                    habitacionCompletamenteOupada.push(datosCama.HabitacionId)
                }
            }

            let habitacionesCompartidas = await Habitacion.findAll({ where: { privada: false }, attributes: ['id', 'cantCamas'], include: [{ model: Cama, attributes: ['id', 'nombre'] }] })


            for (let i = 0; i < habitacionesCompartidas.length; i++) {
                let incluye = false;

                if (disponibles.length === 0 && !habitacionCompletamenteOupada.includes(habitacionesCompartidas[i].id)) {
                    disponibles.push({
                        idHabitacion: habitacionesCompartidas[i].id,
                        cantidadCamas: habitacionesCompartidas[i].cantCamas,
                        camasDisponible: habitacionesCompartidas[i].cantCamas,
                        camasDisponiblesIds: habitacionesCompartidas[i].Camas.map(c => ({ camaNombre: c.nombre, camaId: c.id, }))
                    })
                }
                console.log('habitacion completamente ocupada', habitacionCompletamenteOupada)
                for (let j = 0; j < disponibles.length; j++) {

                    if (disponibles[j].idHabitacion === habitacionesCompartidas[i].id || habitacionCompletamenteOupada.includes(habitacionesCompartidas[i].id)) {
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