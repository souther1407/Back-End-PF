
const express = require('express');
const habitacionesService = require('./../services/habitaciones.services');
const validatorHandler = require('../middleware/validator.handler');
const { crearHabitacionSchema, actualizarHabitacionSchema, getHabitacionSchema} = require('../schemas/habitaciones.schema');
const router = express.Router();
const services = new habitacionesService;
const {chequearRoles} = require('../middleware/auth.handler');
const passport = require('passport'); 
const boom = require('@hapi/boom');
const {checkApiKey} =require('../middleware/auth.handler');




router.get('/',
checkApiKey,
async (req, res)=>{
  try{
    const habitaciones = await services.buscar();
    res.json(habitaciones)
  }catch(error){
    return boom.badData('algo salio mal')
  }
});

router.post('/',
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
validatorHandler(crearHabitacionSchema, 'body'), // validation
async (req, res)=>{
      try {
      const body = req.body
      const nuevaHabitacion = await services.crear(body)
      res.status(201).json(nuevaHabitacion)
    } catch(error) {
      return boom.notFound('algo salio mal')
    }
});

router.get('/:id',
  validatorHandler(getHabitacionSchema, 'params'),
  async (req, res)=>{
    try {
      const {id} = req.params;
      const habitacion = await services.buscaruno(id);
      res.json(habitacion)
    } catch(error) {
      res.status(404).json({
        message: error
      })
    }
});


router.patch('/:id',
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
validatorHandler(getHabitacionSchema, 'params'),
validatorHandler(actualizarHabitacionSchema, 'body'),
  async (req, res)=>{
    try {
      const { id } = req.params
      const body = req.body

      const habitacion = await services.actualizar(id, body)
      res.json(habitacion)
    } catch(error) {
      return boom.notFound('algo salio mal')
  }
});

router.delete('/:id', 
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
async (req, res)=>{
  try {
    const { id } = req.params
    const habitacion = await services.borrar(id)
    res.json(habitacion)
  } catch(error) {
    return boom.notFound('algo salio mal')
  }
});


//   router.get('/:habitacionesId/camas/:camasId', (req, res)=> {
//   const {camasId} = req.params;
//   const {habitacionesId} = req.params;
// })

module.exports = router
