const { sequelize } = require('../libs/sequelize')
const { ReservaCama } = require('../db/models/reservaCama.model')
const { Usuario } = require('../db/models/usuario.model')
const { Cama } = require('../db/models/cama.model')
const { Op } = require('sequelize')

class ReservaService {

    async mostrarReservas(fecha){
        
        const reservas = await ReservaCama.findAll({
            where: {
                fecha_ingreso:{
                    [Op.gte]: fecha ? new Date(fecha) : new Date("1/1/1900")
                }
                   
            },
            include: Cama
        })
        return reservas;
    }

    async mostrarReservaById(){

    }

    

    async crearReserva(idUser, data){
        const newReserva = await ReservaCama.create({
            fecha_ingreso: data.fecha_ingreso,
            fecha_egreso: data.fecha_egreso,
            saldo: data.saldo
        })
        for (let i = 0; i < data.arrCamas.length; i++) {
            Cama.findByPk(data.arrCamas[i])
            .then(cama => {
                newReserva.setCamas(cama)
            })
        }
        Usuario.findByPk(idUser)
        .then(user =>{
            console.log(user)
            newReserva.setUsuario(user)
        })
        return newReserva
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

    async eliminarReserva(){

    }
    async actualizarReserva(){

    }
}

module.exports = ReservaService;