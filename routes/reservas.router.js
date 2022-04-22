const express = require('express')
const ReservaService = require('./../services/reservas.services')
const validatorHandler = require('../middleware/validator.handler')
const { crearReservaSchema, getReservaByFecha, getReservaId } = require('../schemas/reservas.schema')
const router = express.Router()
const {checkApiKey} =require('../middleware/auth.handler');
const services = new ReservaService
const passport = require('passport');
const {chequearRoles} = require('../middleware/auth.handler');
const jwt = require('jsonwebtoken');

router.get('/byFecha',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    validatorHandler(getReservaByFecha, 'query'), 
    async (req, res)=>{
    try {
        const {fecha_ingreso, fecha_egreso} = req.query
        const reservasFiltered = await services.mostrarReservasByFecha(fecha_ingreso, fecha_egreso)
        res.status(200).json(reservasFiltered)
    } catch (error) {
        res.status(error)
    }
});

router.get('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    async (req, res)=>{
    try {
        const reservas = await services.mostrar()
        res.status(200).json(reservas)
    } catch (error) {
        res.status(error)
    }
});

router.get('/disponibilidad', async (req, res)=>{
    
    try {
        const reservas = await services.mostrardisponibilidad(req.query)
        res.status(200).json(reservas)
    } catch (error) {
        res.status(error)
    }
});

router.get('/disponibilidad/:id', 
checkApiKey,
async (req, res)=>{
    try {
        const reservas = await services.mostrardisponibilidadById(req.params)
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

router.delete('/:id',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles("administrador", "recepcionista", "cliente"),
    validatorHandler(getReservaId, 'params'),
    async (req,res) =>{
        try {
            const {id} = req.params
            const deleteReserva = await services.eliminarReserva(id)
            res.status(200).json(deleteReserva)
        } catch (error) {
            res.status(error)
        }

    })

router.post('/',
    checkApiKey,
    passport.authenticate('jwt', {session: false}),
    chequearRoles('administrador', 'recepcionista, cliente'),
    validatorHandler(crearReservaSchema, 'body'),
    async (req, res)=>{
        try {
            
            const token = req.headers['authorization'];
            const body = req.body
            const newReserva = await services.crearReserva(body, token)
            res.status(201).json(newReserva)
        } catch(error) {
            res.status(error)
        }
});

module.exports = router