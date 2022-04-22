const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const {config} = require('../config/config.js')
const {checkApiKey} =require('../middleware/auth.handler');
const AuthService = require('../services/auth.services');
const service = new AuthService
const router = express.Router();

router.post('/login',
checkApiKey, 
passport.authenticate('local', {session: false}),
async (req, res, next) => {
  try {
    const usuario = req.user.dataValues;
    res.json(await service.firmarToken(usuario))
    } catch (error) {
    next(error);
  }
});

router.post('/recuperacion',
checkApiKey, 
async (req, res, next) => {
  try { 
    const { email } = req.body.email
    const respuesta = await service.enviarRecuperacion(req.body.email)
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

router.post('/cambiar-password', 
checkApiKey,
async (req, res, next) => {
  try { 
    const { token, newPassword } = req.body;
    const respuesta = await service.cambiarPaswword(token, newPassword)
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh-token',
checkApiKey, 
async(req, res, next) =>{
try {
  const respuesta = await service.refreshToken(req)
  res.json(respuesta)
} catch(error) {
next(error)
}
});


module.exports = router;
