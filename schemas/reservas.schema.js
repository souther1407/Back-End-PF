const joi = require('joi')

const id = joi.string();
const fecha_ingreso = joi.date();
const fecha_egreso = joi.date();
const saldo = joi.number().min(1);
const habitaciones = joi.array().items(joi.number())
const camas = joi.array().items(joi.string())
const estado = joi.string().valid('Booked', 'Occupied', 'For Manteinance', 'Closed')
const id_producto = joi.string()
const id_reserva = joi.string()
const huesped = joi.object()

//Usuario
const email = joi.string().email();
const nombre = joi.string().min(4);
const apellido = joi.string().min(3);
const dni = joi.string()
const fechaNacimiento = joi.date()
const telefono= joi.string().length(10).pattern(/^[0-9]+$/);
const nacionalidad = joi.string()
const tipoDocumento = joi.string()
const genero = joi.string().valid("Male", "Female", "Other")
const direccion = joi.string()

const crearReservaSchema = joi.object({
    fecha_egreso: fecha_egreso.required(),
    fecha_ingreso: fecha_ingreso.required(),
    saldo: saldo.required(),
    habitaciones,
    camas
})

const crearReservaRecepcionSchema = joi.object({
    egreso: fecha_egreso.required(),
    ingreso: fecha_ingreso.required(),
    saldo: saldo.required(),
    habitaciones,
    camas,
    numDoc: dni.required(),
    nombre: nombre.required(),
    apellido: apellido.required(),
    email: email.required(),
    fechaNac: fechaNacimiento.required(),
    nacionalidad,
    telefono,
    direccion,
    tipoDoc: tipoDocumento.required(),
    genero: genero.required()
})

const updateReservaSchema = joi.object({
    id_reserva,
    id_producto,
    saldo,
    estado,
    huesped
})

const getReservaByFecha = joi.object({
    egreso: fecha_egreso.required(),
    ingreso: fecha_ingreso.required()
})

const getReservaId = joi.object({
    id: id.required()
})

module.exports = {
    crearReservaSchema,
    getReservaByFecha,
    getReservaId,
    updateReservaSchema,
    crearReservaRecepcionSchema
}