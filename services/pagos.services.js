const boom = require('@hapi/boom');
const { Pago } = require('../db/models/pago.model');
const { ReservaCama } = require('../db/models/reservaCama.model');
const { Usuario } = require('../db/models/usuario.model')

const Stripe = require('stripe')
const { config } = require('../config/config');
const { Habitacion } = require('../db/models/habitacion.model');
const { Cama } = require('../db/models/cama.model');
const stripe = new Stripe(config.stripeSecret)

class pagosService {

    async crearPago(habitaciones, camas) {
        try {
            const payment = await stripe.paymentIntents.create({
                amount: await this.calcularAmountItems(habitaciones, camas),
                currency: "USD",
                automatic_payment_methods: {
                    enabled: true,
                },
            });

            return {
                clientSecret: payment.client_secret
            }
            // if (payment.status === 'succeeded') {
            //     const cargado = await this.cargarPago(data)
            //     return { msg: cargado, payment }
            // }
            // else {
            //     return { msg: 'El pago no fue completado' }
            // }
        } catch (error) {
            throw boom.badData({ msg: error })
        }
    }

    async calcularAmountItems (habitaciones, camas){
        let amount = 0;
        try {
            if(habitaciones.length){
                for (let i = 0; i < habitaciones.length; i++) {
                    const habitacion = await Habitacion.findByPk(habitaciones[i])
                    amount += habitacion.precio;
                }
            }
            if(camas.length){
                for (let i = 0; i < camas.length; i++) {
                    const cama = await Cama.findByPk(camas[i])
                    amount += cama.precio
                }
            }
            amount = amount * 100
            return amount
        } catch (error) {
            throw boom.conflict(error)
        }
    }
}

module.exports = pagosService