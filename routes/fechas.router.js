const express = require('express');
const passport = require('passport');
const FechaServices = require('../services/fecha.sevices')
const services = new FechaServices
const { DateTime } = require('luxon')
const { Fecha } = require('../db/models/fecha.model');

const router = express.Router();

router.post('/', 
async (req, res, next) => {

  try {
    const body = req.body
    const fechas = await services.crear(body);   
    res.json(fechas);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const fechas = await services.mostrarTodo();
    res.json(fechas);
  } catch (error) {
    next(error);
  }
})

router.get('/disponible', async (req, res, next) => {
  try {
    const query = req.query
    const fechas = await services.constultadisponibe(query);
    res.json(fechas);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
