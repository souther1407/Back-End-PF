
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
async (req, res, next)=>{
  try{
    const habitaciones = await services.buscar();
    res.json(habitaciones)
  }catch(error){
    next(error)
  }
});

router.post('/',
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
validatorHandler(crearHabitacionSchema, 'body'), // validation
async (req, res, next)=>{
      try {
      const body = req.body
      const nuevaHabitacion = await services.crear(body)
      res.status(201).json(nuevaHabitacion)
    } catch(error) {
      next(error)
    }
});

router.get('/:id',
  validatorHandler(getHabitacionSchema, 'params'),
  async (req, res, next)=>{
    try {
      const {id} = req.params;
      const habitacion = await services.buscaruno(id);
      res.json(habitacion)
    } catch(error) {
      next(error)
    }
});

//TODO: Editado por Eric, problemas con variables
router.patch('/:id',
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
/* validatorHandler(getHabitacionSchema, 'params'),
validatorHandler(actualizarHabitacionSchema, 'body'), */
  async (req, res, next)=>{
    try {
      const { id } = req.params
      const body = req.body

      const habitacion = await services.actualizar(id, body)
      res.json(habitacion)
    } catch(error) {
      next(error)
  }
});

router.delete('/:id', 
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
async (req, res, next)=>{
  try {
    const { id } = req.params
    const habitacion = await services.borrar(id)
    res.json(habitacion)
  } catch(error) {
    next(error)
  }
});


//   router.get('/:habitacionesId/camas/:camasId', (req, res)=> {
//   const {camasId} = req.params;
//   const {habitacionesId} = req.params;
// })

module.exports = router
