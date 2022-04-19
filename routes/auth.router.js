const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const {config} = require('../config/config.js')

const AuthService = require('../services/auth.services');
const service = new AuthService
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
  /* const { token } = req.body; */
  console.log(req.body)
  res.json({body:req.body})
  //TODO: busco el googleId en la base, si no está, registro el usuario
})

router.get("/googleProtegida", passport.authenticate("google"), (req, res) => {
  res.json({listo: "ok"})
})

module.exports = router;
