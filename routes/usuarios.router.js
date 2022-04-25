const express = require('express');
const UserService = require('../services/usuarios.services');
const validatorHandler = require('../middleware/validator.handler');
const {chequearRoles, chequearAdminRole} = require('../middleware/auth.handler')
const {checkApiKey} =require('../middleware/auth.handler');
const { updateUserSchema, createUserSchema, getUserSchema } = require('../schemas/usuario.schema');
const passport = require('passport'); 
const boom = require('@hapi/boom');
const router = express.Router();
const service = new UserService


/**
 * 
 * @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: nombre del usuario
 *        apellido:
 *          type: string
 *          description: apellido del usuario
 *        tipoDocumento:
 *          type: string
 *          description: clase de identificador
 *        dni:
 *          type: integer
 *          description: identificacion numerica del usuario
 *        password:
 *          type: string
 *          description: password del usuario, minimo 8 caracteres - maximo  14 caracteres 
 *        email:
 *          type: string
 *          description: passwordl del usuario, minimo 8 caracteres - maximo  14 caracteres
 *        fechaNacimiento:
 *          type: date
 *          description: formato ISO de tipo YYYY/MM/DD
 *        Nacionalidad:
 *          type: string
 *          description: nacionalidad del usuario
 *        telefono:
 *          type: integer
 *          description: numero de telefono de contacto del usuario
 *        direccion:
 *          type: string
 *          description: direccion real del usuario
 *        genero:
 *          type: string
 *          description: genero del usuario, valores validos -femenino, masculino, no-binario-
 *        rol:
 *          type: string
 *          description: rol en la api del usuario, valores validos -administrador, recepcionista, cliente-
 *        required:
 *          nombre:
 *          - apellido:
 *              type: string
 *          - tipo de documento: 
 *          - email:
 *          - password:
 *          - rol:
 *        
 */


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



// crear usuario
router.post('/',
  checkApiKey,
//  passport.authenticate('jwt', {session: false}),
//  chequearRoles("administrador", "recepcionista", "cliente"),
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
