const express = require('express')
const ReservaService = require('./../services/reservas.services')
const validatorHandler = require('../middleware/validator.handler')
const { crearReservaSchema, getReservaByFecha, getReservaId } = require('../schemas/reservas.schema')
const router = express.Router()
const services = new ReservaService

router.get('/byFecha', validatorHandler(getReservaByFecha, 'query'), async (req, res)=>{
    try {
        const {fecha_ingreso, fecha_egreso} = req.query
        const reservasFiltered = await services.mostrarReservasByFecha(fecha_ingreso, fecha_egreso)
        res.status(200).json(reservasFiltered)
    } catch (error) {
        res.status(error)
    }
});

router.get('/', async (req, res)=>{
    try {
        const reservas = await services.mostrar()
        res.status(200).json(reservas)
    } catch (error) {
        res.status(error)
    }
});

// router.patch('/:id',
//     async (req, res) => {
//         try {
//             const {id} = req.params
//             const body = req.body
//             const updateHuesped = await services.cargarHuespedes(body, id) 
//             res.status(200).json(updateHuesped)
//         } catch (error) {
//             res.status(error)
//         }
//     }
// )

router.post('/:id',
    validatorHandler(getReservaId, 'params'),
    validatorHandler(crearReservaSchema, 'body'),
  async (req, res)=>{
    try {
        const {id} = req.params
        const body = req.body
        const newReserva = await services.crearReserva(id, body)
        res.status(201).json(newReserva)
    } catch(error) {
        res.status(error)
    }
});

module.exports = router