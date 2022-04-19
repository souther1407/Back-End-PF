const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const { checkGoogleToken } = require('../middleware/auth.handler.js');
const AuthService = require('../services/auth.services');
const service = new AuthService;
const router = express.Router();

const SECRET = "kirikocho"

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

router.get("/prohibido",passport.authorize("google"), (req, res) =>{
  res.json({listo:"df"})
})

router.post("/auth/google", async (req, res) => {
  const { googleId } = req.body;
  const token = req.headers.authorization.split(" ")[1]
  console.log(token)
  const payload = jwt.verify(token,"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")
  try {
    res.json({ success: true, token:req.headers.authorization, payload})
  } catch (error) {
    res.json(error)
}
})

  //TODO: busco el googleId en la base, si no está, registro el usuario


/* router.post("/signup",(req ,res) => {

}) */

module.exports = router;