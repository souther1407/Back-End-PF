const express = require('express')
const router = express.Router()
const pagoService = require('../services/pagos.services')
const service = new pagoService()

router.post('/checkout', async (req, res) => {
    try {
        const {habitaciones, camas} = req.body
        console.log(habitaciones, camas)
        const payment = await service.crearPago(habitaciones, camas)
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message });
    }
})

module.exports = router