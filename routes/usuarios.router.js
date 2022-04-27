const express = require('express');
const UserService = require('../services/usuarios.services');
const validatorHandler = require('../middleware/validator.handler');
const {chequearRoles} = require('../middleware/auth.handler')
const {checkApiKey} =require('../middleware/auth.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const passport = require('passport'); 
const boom = require('@hapi/boom');
const router = express.Router();
const service = new UserService

router.get('/',
checkApiKey,
// passport.authenticate('jwt', {session: false}),
// chequearRoles("administrador", "recepcionisa"),
async (req, res, next) => {
  try {
    const users = await service.mostrarTodo();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:dni',
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionisa"),
validatorHandler(getUserSchema, 'params'),
async (req, res, next) => {
  
  try {
      const { dni } = req.params;
      const usuarios = await service.mostrarByDni(dni);
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }
);



// crear usuario
router.post('/',
  checkApiKey,
  validatorHandler(createUserSchema, 'body'), 
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUsuario = await service.crear(body);
      res.status(201).json(newUsuario);
    } catch (error) {
      return boom.badData()
      };
    }
);

router.patch('/:dni',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista", "cliente"),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { dni } = req.params;
      const body = req.body;
      const usuario = await service.actualizar(dni, body);
      usuario.respuesta.password = undefined
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:dni',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista", "cliente"),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { dni } = req.params;
      await service.delete(dni);
      res.status(201).json({dni});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
