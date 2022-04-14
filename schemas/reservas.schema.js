const joi = require('joi')

const id = joi.string();
const fecha_ingreso = joi.date();
const fecha_egreso = joi.date();
const saldo = joi.number().min(1);
const habitaciones = joi.array().items(joi.number())
const camas = joi.array().items(joi.string())

const crearReservaSchema = joi.object({
    fecha_egreso: fecha_egreso.required(),
    fecha_ingreso: fecha_ingreso.required(),
    saldo: saldo.required(),
    habitaciones,
    camas
})

const getReservaByFecha = joi.object({
    fecha_egreso: fecha_egreso.required(),
    fecha_ingreso: fecha_ingreso.required()
})

const getReservaId = joi.object({
    id: id.required()
})

module.exports = {
    crearReservaSchema,
    getReservaByFecha,
    getReservaId
}