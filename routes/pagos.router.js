const express = require('express')
const passport = require('passport')
const { checkApiKey } = require('../middleware/auth.handler')
const router = express.Router()
const pagoService = require('../services/pagos.services')
const service = new pagoService()

router.post('/checkout',checkApiKey,passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {

        const {cart} = req.body
        console.log(cart)
        const payment = await service.crearPago(cart)
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.json({ message: error });
    }
})

module.exports = router