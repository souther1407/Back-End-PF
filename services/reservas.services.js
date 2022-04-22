const boom = require('@hapi/boom');
const { sequelize } = require('../libs/sequelize')
const { ReservaCama } = require('../db/models/reservaCama.model')
const { Huesped } = require('../db/models/huesped.model')
const { Usuario } = require('../db/models/usuario.model')
const { Cama } = require('../db/models/cama.model')
const { Habitacion } = require('../db/models/habitacion.model')
const jwt = require('jsonwebtoken');
const { config } = require('../config/config')

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
                    model: Habitacion,
                    include: Huesped
                },
                {
                    model: Cama,
                    include: Huesped
                },
                {
                    model: Usuario,
                    attributes: ['dni', 'nombre', 'apellido']
                }
                ]

        })
        return reservas
    }



    async crearReserva(data, token) {
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
            }
        }
        if (data.habitaciones) {
            for (let i = 0; i < data.habitaciones.length; i++) {
                Habitacion.findByPk(data.habitaciones[i])
                    .then(habitacion => {
                        newReserva.addHabitacion(habitacion)
                    })
            }
        }
        const tokenInfo = token.split(' ')
        const payload = jwt.verify(tokenInfo[1], config.jwtSecret)
        console.log(payload)

        Usuario.findByPk(payload.sub)
            .then(user => {
                newReserva.setUsuario(user)
            })
        return newReserva
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


}

module.exports = ReservaService;