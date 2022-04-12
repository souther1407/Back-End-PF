const express = require('express')
const router = express.Router()
const camasServices = require('../services/camas.services.js')
const services = new camasServices



router.get('/', async (req, res) => {
  try {
    const camas = await services.mostrarTodas()
    res.status(200).json(camas)
  } catch(error) {
    res.status(error)
  }
})

router.get('/:id', async (req, res) =>{
  try {
    const {id} = req.params
    const camas = await services.traeruna(id);
    res.status(200).json(camas)
  } catch (error) {
    res.status(error)
  }
})

router.patch('/:id', async (req, res)=> {
  try {
    const {id} = req.params
    const body = req.body
    const camaUpdate = await services.actualizar(id, body)
    res.json(camaUpdate)
  } catch (error) {
    res.status(error)
  }
})


module.exports = router
