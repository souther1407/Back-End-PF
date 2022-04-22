const express = require('express');
const router = express.Router();

const HabitacionestipoService = require('../services/Habitacionestipo.services')
const validatorHandler = require('../middleware/validator.handler')
const { getHabitacionTipoSchema} = require('../schemas/habitaciones.schema')
const { Habitacion } = require('../db/models/habitacion.model.js')
const {checkApiKey} =require('../middleware/auth.handler');


const services = new HabitacionestipoService

router.get('/',
checkApiKey,
validatorHandler(getHabitacionTipoSchema, 'query'),
  async (req, res)=>{

    const {tipo, bano} = req.query;
    let habitaciones=''
    try {
      if(tipo && bano){
        habitaciones = await services.mostrarByhabBan(tipo, bano)
      }else if(tipo){
        habitaciones = await services.mostrarBytipo(tipo)
      }else if(bano){
        habitaciones = await services.mostrarBybano(bano)
      }
  
      res.status(201).json(habitaciones)

    } catch(error) {
      return error
    }

    // if(req.query.tipo){
    // try {
    //   const {tipo} = req.query
    //   const habitaciones = await services.mostrarBytipo(tipo)
    //   res.status(201).json(habitaciones)
    // } catch(error) {
    //   res.status(error)
    // }}
    // if (req.query.bano){
    //   try {
    //     const {bano} = req.query
    //     const habitaciones = await services.mostrarBybano(bano)
    //     res.status(201).json(habitaciones)
    //   } catch(error) {
    //     res.status(error)
    //   }
    // }

});


module.exports= router