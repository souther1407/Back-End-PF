const router = require("express").Router()
const { Nacionalidades } = require("../db/models/nacionalidad.model")

router.get("/", async (req, res, next) => {
    try {
        const nacionalidades = await Nacionalidades.findAll();
        res.json(nacionalidades);
    } catch(error) {
        next(error)    
    }
    
})


module.exports = router;