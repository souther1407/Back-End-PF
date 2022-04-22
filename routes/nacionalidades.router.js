const router = require("express").Router()
const { Nacionalidades } = require("../db/models/nacionalidad.model")

router.get("/", async (req, res) => {
    const nacionalidades = await Nacionalidades.findAll();
    res.json(nacionalidades);
})


module.exports = router;