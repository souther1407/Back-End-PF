const express = require('express');
const router = express.Router();
const ContactoService = require('../services/contacto.services')
const validatorHandler = require('../middleware/validator.handler');
const {checkApiKey} =require('../middleware/auth.handler');
const {mensajeSchema} = require('../schemas/contacto.schema');
const boom = require('@hapi/boom')
const services = new ContactoService

router.post('/',
checkApiKey,
validatorHandler(mensajeSchema, 'body'), // validation
async (req, res, next)=>{
    try {
        const body = req.body
        const contacto = await services.crear(body)
        res.status(201).json(contacto)
    } catch(error) {
        next(error)
    }
});

module.exports = router