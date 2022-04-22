const express = require('express');
const ImagenService = require('../services/imagenes.services');
const validatorHandler = require('../middleware/validator.handler');
const {chequearRoles, } = require('../middleware/auth.handler')
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const {checkApiKey} =require('../middleware/auth.handler');
const passport = require('passport'); 
const router = express.Router();
const service = new ImagenService

router.get('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionisa"),
async (req, res, next) => {
  try {
    const imagenes = service.mostrarTodo()
    res.status(200).json(imagenes)  
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionisa"),
//validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.query 
    const imagen = service.buscarPorId(id)
    res.status(200).json(imagen)  
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionista", "cliente"),
 //validatorHandler(createUserSchema, 'body'), 
  async (req, res, next) => {
    try {
      const {id, imagen} = req.body
      const nuevaImagen = service.crear(id, imagen)
      res.status(201).json(nuevaImagen);
    } catch (error) {
      next(error)
    }
  }
);

router.patch('/:id',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionista", "cliente"),
 // validatorHandler(getUserSchema, 'params'),
 // validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista", "cliente"),
  //validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
