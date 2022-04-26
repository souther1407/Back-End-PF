const express = require('express')
const router = express.Router()
const pagoService = require('../services/pagos.services')
const service = new pagoService()

router.post('/checkout', async (req, res) => {
    try {
        const { item } = req.body
        console.log(item)
        const payment = await service.crearPago(item)
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error);
        return res.json({ message: error });
    }
})

module.exports = router