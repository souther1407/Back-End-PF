const express = require('express')
const habitacionesService = require('./../services/habitaciones.services')
const validatorHandler = require('../middleware/validator.handler')
const { crearHabitacionSchema, actualizarHabitacionSchema, getHabitacionSchema} = require('../schemas/habitaciones.schema')
const router = express.Router()
const services = new habitacionesService

router.get('/', async (req, res)=>{
  const habitaciones = await services.buscar();
  res.json(habitaciones)
});

// router.get('/filter', (req, res)=>{
//   res.json('soy el filtro')
// });

<<<<<<< HEAD


router.post('/',
 validatorHandler(crearHabitacionSchema, 'body'), // validation
  async (req, res)=>{
    try {
      const body = req.body
      const nuevaHabitacion = await services.crear(body)
      res.status(201).json(nuevaHabitacion)
    } catch(error) {
      res.status(error)
    }
});

=======
// Filtra por tipo de habitacion 
router.get('/filter',
  async (req, res)=>{
    const { privada } = req.query
    try {
      const Rooms = await services.FilterByTypeRoom(privada);
      res.json(Rooms)
    } catch(error) {
      res.status(404).json({
        message: error
      })
    }
});
router.get('/filter/withBathroom',
  async (req, res)=>{
    try {
      const Rooms = await services.FilterWithBathroom();
      res.json(Rooms)
    } catch(error) {
      res.status(404).json({
        message: error
      })
    }
});
>>>>>>> 016df52e8a97e42acac173d9a9d669db0fe6ed5f
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

<<<<<<< HEAD
=======
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

>>>>>>> 016df52e8a97e42acac173d9a9d669db0fe6ed5f
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
