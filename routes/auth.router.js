const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const { checkGoogleToken } = require('../middleware/auth.handler.js');
const AuthService = require('../services/auth.services');
const service = new AuthService;



//TODO: usar lo de rodrigo
const bcrypt = require('bcrypt');

const router = express.Router();

require("../utils/auth/strategies/Google.strategy")
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
  console.log(googleId)
  console.log
  const token = req.headers.authorization.split(" ")[1]
  const payload = jwt.decode(token)
  try {
    res.json({ success: true, googleId, payload})
  } catch (error) {
    res.json(error)
}
})

  //TODO: busco el googleId en la base, si no está, registro el usuario


router.post("/signup",async (req ,res) => {

  const {dni,googleId,nombre,apellido,email,password} = req.body;
  let existeUsuarioGoogle;
  let existeUsuario;

  try {
    
    if(googleId){
       existeUsuarioGoogle = await Usuario.findOne({where:{ googleId }});
    }else{
       existeUsuario = await Usuario.findOne({where:{dni}});
    }
  
    if(existeUsuarioGoogle !== null || existeUsuario !== null){

      return res.json({success: false, msg:"Ya existe el usuario"})

    }else{

      const newUser = await Usuario.create({dni,googleId,nombre,apellido,email,password:await bcrypt.hash(password+email,12)})
      res.json({success:true, msg:"Usuario creado con éxito"})

    }
  } catch (error) {
    console.log(error)
    res.status(400).json({error})
  }

})

module.exports = router;