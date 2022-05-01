const express = require('express')
const ReservaService = require('./../services/reservas.services')
const PagosService = require("../services/pagos.services")
const validatorHandler = require('../middleware/validator.handler')
const { getReservaByFecha, getReservaId, updateReservaSchema } = require('../schemas/reservas.schema')
const { chequearRoles } = require('../middleware/auth.handler')
const passport = require('passport'); 
const router = express.Router()
const {checkApiKey} =require('../middleware/auth.handler');
const services = new ReservaService
const servicesPago= new PagosService


router.get('/byFecha',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    validatorHandler(getReservaByFecha, 'query'), 
    async (req, res, next)=>{
    try {
        const {ingreso,egreso} = req.query
        console.log(ingreso, egreso);
        const reservasFiltered = await services.mostrarReservasByFecha(ingreso, egreso)
        res.status(200).json(reservasFiltered)
    } catch (error) {
        next(error)
    }
});

router.get('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    async (req, res, next)=>{
    try {
        const reservas = await services.mostrar()
        res.status(200).json(reservas)
    } catch (error) {
        next(error)
    }

});

router.get('/disponibilidad', async (req, res, next)=>{
    
    try {
        const reservas = await services.mostrardisponibilidad(req.query)
        res.status(200).json(reservas)
    } catch (error) {
        next(error)
    }
});

router.get('/:id', 
checkApiKey,
async (req, res, next)=>{
    try {
        const reservas = await services.mostrardisponibilidadById(req.params)
        res.status(200).json(reservas)
    } catch (error) {
        next(error)
    }
});


//actualizar reserva (estado, huesped o saldo)
router.patch('/update',
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista"),
    validatorHandler(updateReservaSchema, 'body'),
    async (req, res, next) => {
        try {
            const data = req.body
            const updateHuesped = await services.actualizarReserva(data) 
            res.status(200).json(updateHuesped)
        } catch (error) {
            next(error)
        }
    }
)

router.delete('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    validatorHandler(getReservaId, 'params'),
    async (req, res, next) =>{
        try {
            const {id} = req.params
            const deleteReserva = await services.eliminarReserva(id)
            res.status(200).json(deleteReserva)
        } catch (error) {
            next(error)
        }

    })
//TODO: corregir validatorHandler para que acepte  toBack e infoPayment
router.post('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles('administrador', 'recepcionista', 'cliente'),
    /* validatorHandler(crearReservaSchema, 'body'), */
    async (req, res, next)=>{
        try {
            
            let {toBack, infoPayment} = req.body
            console.log("toBack--->>",toBack)
            console.log("infoPayment--->>",infoPayment)
            const token = req.headers['authorization'];
            infoPayment.amount = toBack.saldo
            const newReserva = await services.crearReserva(toBack, token)
            const newPago = await servicesPago.guardarPago(infoPayment)
            newReserva.setPago(newPago);
            res.status(201).json(newReserva)
        } catch(error) {
            next(error)
        }
});

module.exports = router