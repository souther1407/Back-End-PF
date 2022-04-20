const express = require('express');
const UserService = require('../services/usuarios.services');
const validatorHandler = require('../middleware/validator.handler');
const {chequearRoles} = require('../middleware/auth.handler')
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const passport = require('passport'); 
const router = express.Router();
const service = new UserService

router.get('/',
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
chequearRoles(['administrador', 'recepcionista']),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { dni } = req.params;
      const category = await service.mostrarByDni(dni);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
 /* passport.authenticate('jwt', {session: false}),
 chequearRoles(['administrador']), */
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
  passport.authenticate('jwt', {session: false}),
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
  passport.authenticate('jwt', {session: false}),
  chequearRoles(['rececionista']),
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
