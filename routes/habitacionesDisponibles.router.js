const express = require('express')
const habitacionDisponiblesService = require('./../services/habitacionesDisponibles.services')
const validatorHandler = require('../middleware/validator.handler')
// const { crearReservaSchema, getReservaByFecha, getReservaId } = require('../schemas/reservas.schema')
const router = express.Router()
const services = new habitacionDisponiblesService

router.get('/', validatorHandler(getReservaByFecha, 'query'), 

async (req, res)=>{
    try {
        const {fecha_ingreso, fecha_egreso} = req.query
        const reservasFiltered = await services.mostrarReservasByFecha(fecha_ingreso, fecha_egreso)
        res.status(200).json(reservasFiltered)
    } catch (error) {
        res.status(error)
    }
});

module.exports = router