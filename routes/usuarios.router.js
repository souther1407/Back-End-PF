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


/**
 *
 *  @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      required:
 *        - dni
 *        - tipoDocumento
 *        - nombre
 *        - apellido
 *        - password
 *        - email
 *        - rol
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
 *          required: true
 *        password:
 *          type: string
 *          description: password del usuario
 *          minLength: 8
 *          maxLength: 20
 *        email:
 *          type: string
 *          description: email valido del usuario
 *          format: email
 *        fechaNacimiento:
 *          type: string
 *          description: formato ISO de tipo YYYY/MM/DD
 *          format: date
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
 *          description: genero del usuario
 *          type: string
 *          oneOf :
 *            - masculino
 *            - femenino 
 *            - no binario 
 *        rol:
 *          type: string
 *          description: rol en la api del usuario
 *          oneOf:
 *            - administrador
 *            - recepcionista
 *            - cliente
 */


/**
 * @swagger
 * path:
 * /usuarios:
 *  get:
 *    summary: lista todos los usuarios
 *    tags: [Usuario]
 *    requestBody:
 *      required: false
 *  responses:
 *      200:
 *        description: array de usuarios
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

/**
 * @swagger
 * path:
 * /usuarios/{dni}:
 *  get:
 *    summary: buscar usuario por numero de dni
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: dni   
 *        required: true
 *        schema:
 *          type: integer
 *          required: true
 *          description: el dni del usuario
 *    responses:
 *        "200":
 *          description: json con el detalle del usuario
 */
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


/**
 * @swagger
 * /usuarios:
 *  post:
 *    summary: crear un nuevo usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: "#/components/schemas/Usuario"           
 *    responses:
 *      200:
 *        description: request body
 */


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
