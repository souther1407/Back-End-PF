const express = require('express')
const router = express.Router()
const pagoService = require('../services/pagos.services')
const service = new pagoService()

router.post('/checkout', async (req, res) => {
    try {
        console.log(req.body)
        const payment = await service.crearPago(req.body)
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.json({ message: error });
    }
})

module.exports = router