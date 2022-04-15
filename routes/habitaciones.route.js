const express = require('express')
const habitacionesService = require('./../services/habitaciones.services')
const validatorHandler = require('../middleware/validator.handler')
const {checkApiKey} =require('../middleware/auth.handler')
const { crearHabitacionSchema, actualizarHabitacionSchema, getHabitacionSchema} = require('../schemas/habitaciones.schema')
const router = express.Router()
const services = new habitacionesService


router.get('/',
checkApiKey,
async (req, res)=>{
  const habitaciones = await services.buscar();
  res.json(habitaciones)
});

// router.get('/filter', (req, res)=>{
//   res.json('soy el filtro')
// });



router.post('/',
 checkApiKey,
 validatorHandler(crearHabitacionSchema, 'body'), // validation
  async (req, res)=>{
    console.log('trayendo habitaciones')
    try {
      const body = req.body
      const nuevaHabitacion = await services.crear(body)
      res.status(201).json(nuevaHabitacion)
    } catch(error) {
      res.status(error)
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

router.post('/',
 validatorHandler(crearHabitacionSchema, 'body'), // validation
  async (req, res)=>{
    console.log(req.body)
    try {
      const body = req.body
      const nuevaHabitacion = await services.crear(body)
      res.status(201).json(nuevaHabitacion)
    } catch(error) {
      res.status(error)
    }
});

router.patch('/:id',
validatorHandler(getHabitacionSchema, 'params'),
validatorHandler(actualizarHabitacionSchema, 'body'),
  async (req, res)=>{
    try {
      const { id } = req.params
      const body = req.body

      const habitacion = await services.actualizar(id, body)
      res.json(habitacion)
    } catch(error) {
      console.log(error)
      res.status(404).json({
        message: error
      })
  }
});

router.delete('/:id', async (req, res)=>{
  try {
    const { id } = req.params
    const habitacion = await services.borrar(id)
    res.json(habitacion)
  } catch(error) {
    res.status(404).json({
      message: error
    })
  }
});


//   router.get('/:habitacionesId/camas/:camasId', (req, res)=> {
//   const {camasId} = req.params;
//   const {habitacionesId} = req.params;
// })

module.exports = router
