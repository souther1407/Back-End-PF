const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../db/models/usuario.model');
const {config} = require('../config/config.js')


const router = express.Router();

router.post('/login', 
passport.authenticate('local', {session: false}),
async (req, res, next) => {
  try {
    const usuraio = req.user;
    const payload = {
      sub:usuraio.id,
      role: usuraio.rol,
    }

    const token = jwt.sign(payload, config.jwtSecret );
    console.log(token)
    res.json({
      usuario :usuraio.dataValues.email,
      rol: usuraio.dataValues.rol,
      token
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
