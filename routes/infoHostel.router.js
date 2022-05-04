const express = require('express');
const HostelService = require('../services/infoHostel.services');
const {chequearRoles, } = require('../middleware/auth.handler')
const { crearInfoHostelSchema, actualizarInfoHostelSchema } = require('../schemas/infoHostel.schema')
const {checkApiKey} =require('../middleware/auth.handler');
const passport = require('passport');
const router = express.Router();
const service = new HostelService

router.get('/',
checkApiKey,
async (req, res, next) => {
  try {
    const infoHostel = await service.mostrarInfo()
    res.status(200).json(infoHostel)  
  } catch (error) {
    next(error);
  }
});
router.get('/:id',
  checkApiKey,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const infoHostel = await service.infoById(id)
      res.status(200).json(infoHostel)  
    } catch (error) {
      next(error);
    }
});

router.post('/',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista"),

  async (req, res, next) => {
    try {
      const body = req.body
      const infoHostel = await service.crear(body)
      res.status(201).json(infoHostel);
    } catch (error) {
      next(error)
    }
  }
);

router.patch('/:id',
  checkApiKey,
  passport.authenticate('jwt', {session: false}),
  chequearRoles("administrador", "recepcionista"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const infoHostel = await service.modificarInfo(id, body)
      res.status(201).json(infoHostel);

    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
checkApiKey,
passport.authenticate('jwt', {session: false}),
chequearRoles("administrador", "recepcionista"),
async (req, res, next) => {
  try {
    const { id } = req.params
    const infoHostel = await service.delete(id)
    res.status(201).json(infoHostel);

  } catch (error) {
    next(error);
  }
}
);

module.exports = router;
