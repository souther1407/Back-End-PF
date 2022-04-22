const express = require('express');
const UserService = require('../services/usuarios.services');
const validatorHandler = require('../middleware/validator.handler');
const {chequearRoles, chequearAdminRole} = require('../middleware/auth.handler')
const {checkApiKey} =require('../middleware/auth.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const passport = require('passport'); 
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
  console.log(req)
  try {
      const { dni } = req.params;
      const usuarios = await service.mostrarByDni(dni);
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  checkApiKey,
//  passport.authenticate('jwt', {session: false}),
//  chequearRoles("administrador", "recepcionista", "cliente"),
  validatorHandler(createUserSchema, 'body'), 
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const newUsuario = await service.crear(body);
      res.status(201).json(newUsuario);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista", "cliente"),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.actualizar(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista", "cliente"),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
