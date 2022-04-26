const express = require('express');
const router = express.Router();
const {chequearRoles} = require('../middleware/auth.handler');
const passport = require('passport');
const camasServices = require('../services/camas.services');
const validatorHandler = require('../middleware/validator.handler');
const {crearCamaSchema, actualizarCamaSchema, getCamaSchema, borrarCama} = require('../schemas/camas.schema');
const {checkApiKey} =require('../middleware/auth.handler');



// eslint-disable-next-line new-cap
const services = new camasServices

router.get('/', 
checkApiKey,
async (req, res, next,) => {
  try {
    const camas = await services.mostrarTodas()
    res.status(200).json(camas)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', 
checkApiKey,
validatorHandler(getCamaSchema, 'params'),
async (req, res, next) =>{
  try {
    const {id} = req.params
    console.log(id)
    const camas = await services.traeruna(id);
    res.status(200).json(camas)
  } catch (error) {
    next(error)
  }
})

router.post('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
 validatorHandler(crearCamaSchema, 'body'), // validation
  async (req, res, next)=>{
    try {
      const body = req.body
      const nuevaCama = await services.crear(body)
      res.status(201).json(nuevaCama)
    } catch(error) {
      next(error)
    }
});

router.patch('/:id',
checkApiKey, 
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
async (req, res, next)=> {
  try {
    const {id} = req.params
    const body = req.body
    const camaUpdate = await services.actualizar(id, body)
    res.json(camaUpdate)
  } catch (error) {
    next(error)
  }
})

router.delete('/',
checkApiKey, 
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
async (req, res, next)=>{
  try {
    const { habitacionid, camaId } = req.query
    let cama;
  // eslint-disable-next-line no-unused-expressions
  habitacionid ? cama = await services.borrar(habitacionid, 'Habitacion') : 
  camaId ? cama = await services.borrar(camaId, 'Cama') : null
  res.json(cama)
  } catch(error) {
    next(error)
  }
});

module.exports = router
