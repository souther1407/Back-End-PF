const express = require('express');
const router = express.Router();
const {chequearRoles} = require('../middleware/auth.handler');
const passport = require('passport');
const validatorHandler = require('../middleware/validator.handler');
const {checkApiKey} =require('../middleware/auth.handler');
const stripe = require('stripe')


router.post('/',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles('administrador'),
 validatorHandler(crearCamaSchema, 'body'), // validation
  async (req, res, next)=>{
    try {
      res.send('aca van los pagos')
      
    } catch(error) {
      next(error)
    }
});





module.exports = router
