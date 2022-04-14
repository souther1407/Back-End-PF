const express = require('express');

const router = express.Router();
const huespedServices = require('../services/huesped.sevices');


// eslint-disable-next-line new-cap
const services = new huespedServices

router.get('/', async (req, res) => {
    try {
        const huespedes = await services.mostrarTodo()
        res.status(200).json(huespedes)
    } catch (error) {
        res.status(error)
    }
})

router.get('/:id', async (req, res)=> {
  
})

router.post('/',async (req, res)=> {
  
});

router.patch('/:id', async (req, res)=> {
  
})


module.exports = router