const express = require('express')
const ReservaService = require('./../services/reservas.services')
// const validatorHandler = require('../middleware/validator.handler')
const router = express.Router()
const services = new ReservaService

router.get('/', async (req, res)=>{
    const {fecha} = req.query
    try {
        const reservas = await services.mostrarReservas(fecha)

        res.status(200).json(reservas)
    } catch (error) {
        res.status(error)
    }
});



router.patch('/:id',
    async (req, res) => {
        try {
            const {id} = req.params
            const body = req.body
            const updateHuesped = await services.cargarHuespedes(body, id) 
            res.status(200).json(updateHuesped)
        } catch (error) {
            res.status(error)
        }
    }
)

router.post('/:id',
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