const boom = require('@hapi/boom');
const { Pago } = require('../db/models/pago.model');
const { ReservaCama } = require('../db/models/reservaCama.model');
const { Usuario } = require('../db/models/usuario.model')

const Stripe = require('stripe')
const { config } = require('../config/config');
const { Habitacion } = require('../db/models/habitacion.model');
const { Cama } = require('../db/models/cama.model');
const stripe = new Stripe(config.stripeSecret)

class PagosService {

    async crearPago(data) {
        let habitaciones = []
        let camas = []
        for (let i = 0; i < data.length; i++) {
            if(data[i].private === 'shared'){
                const beds = data[i].beds
                for (let j = 0; j < beds.length; j++) {
                    camas.push(beds[j].camaId)
                }
            }
            if(data[i].private === 'private'){
                habitaciones.push(data[i].roomId)
            }
        }
        try {
            const payment = await stripe.paymentIntents.create({
                amount: await this.calcularAmountItems(habitaciones, camas),
                currency: "USD",
                automatic_payment_methods: {
                    enabled: true,
                },
            });
            return {
                clientSecret: payment.client_secret,
                cart:data
            }
        } catch (error) {
            throw boom.badData({ msg: error })
        }
    }
    //a
   
    async calcularAmountItems (habitaciones, camas){
        let amount = 0;
        try {
            if(habitaciones.length !== 0){
                for (let i = 0; i < habitaciones.length; i++) {
                    console.log("entrando a habitacion findByPk")
                    const habitacion = await Habitacion.findByPk(habitaciones[i])
                    console.log(habitacion)
                    amount += habitacion.precio;
                }
            }
            if(camas.length !== 0){
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
    /*
        {
            id,
            status,
            receipt_email,
            currency,
            payment_method_types
        } 
     */
    async guardarPago(infoPago){
        //TODO: guardar en la tabla pago la info del pago,
        const newPago = await Pago.create({
            id:infoPago.id,
            moneda:infoPago.currency,
            monto:infoPago.amount,
            metodoDePago:infoPago.payment_method_types[0],
            estado:infoPago.status,
        })

        return newPago
    }
}

module.exports = PagosService