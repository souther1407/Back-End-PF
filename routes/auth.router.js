const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const { checkGoogleToken } = require('../middleware/auth.handler.js');
const AuthService = require('../services/auth.services');
const service = new AuthService;
const router = express.Router();

router.post('/login', 
passport.authenticate('local', {session: false}),
async (req, res, next) => {
  try {
    const usuraio = req.user.dataValues;
    res.json(service.firmarToken(usuraio))
  } catch (error) {
    next(error);
  }
});

router.post('/recuperacion', 
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

async (req, res, next) => {
  try { 
    const { token, newPassword } = req.body;
    const respuesta = await service.cambiarPaswword(token, newPassword)
    res.json(respuesta);
  } catch (error) {
    next(error);
  }
});

router.post("/auth/google",(req, res) => {
  const { token, googleId } = req.body;
  try {
    console.log("googleId", googleId)
    console.log("token",token)
    const payload = jwt.verify(token, "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")
  
    res.json({payload})
  } catch (error) {
    res.json(error)
  }
  //TODO: busco el googleId en la base, si no está, registro el usuario
})

router.get("/googleProtegida",passport.authorize("google-authz"), (req, res) => {
  res.json({listo: "ok"})
})

module.exports = router;
