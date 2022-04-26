const express = require('express')
const router = express.Router()
const pagoService = require('../services/pagos.services')
const service = new pagoService()

router.post('/checkout', async (req, res) => {
    try {
        const {items} = req.body
        console.log(req.headers.authorization)
        const payment = await service.crearPago(items)
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.json({ message: error.raw.message });
    }
})

module.exports = router