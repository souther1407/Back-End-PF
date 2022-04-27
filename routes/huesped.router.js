const express = require('express');
const passport = require('passport');
const { checkApiKey, chequearRoles } = require('../middleware/auth.handler');

const router = express.Router();
const huespedServices = require('../services/huesped.sevices');


// eslint-disable-next-line new-cap
const services = new huespedServices

router.get('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador', 'recepcionista, cliente'),
async (req, res, next) => {
    try {
        const huespedes = await services.mostrarTodo()
        res.status(200).json(huespedes)
    } catch (error) {
        next(error)
    }
})

router.get('/:id',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador', 'recepcionista, cliente'),
async (req, res)=> {
  const { id } = req.params
  try {
      const huesped = await services.detalleHuesped(id)
      res.json(huesped)
  } catch (error) {
      res.status(400).json(error)
  }
})

router.post('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador', 'recepcionista, cliente'),
async (req, res)=> {
  
});

router.patch('/:id',checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador', 'recepcionista, cliente'),
async (req, res)=> {
  
})


router.delete('/:id',checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador', 'recepcionista, cliente'),
async (req, res)=> {
  const { id } = req.body
  try {
     await services.eliminarHuesped(id)
     res.json({ success: true, msg: "huesped eliminado"})
  } catch (error) {
      res.status(400).json(error)
  }
})


module.exports = router