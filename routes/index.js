const habitacionesRouter = require('./habitaciones.route')
const camasRouter = require('./camas.router')
const usuariosRouter = require('./usuarios.router')
const reservaRouter =  require('./reservas.router')
const habitaciontipoRouter = require('./habitaciontipo.router')
const contactoRouter = require('./conctacto.router')
const pagoRouter = require('./pagos.router')
const infoHostelRouter = require('./infoHostel.router')

// const habitacionesDisponiblesRouter = require('./habitacionesDisponibles.router')

const nacionalidadesRouter = require("./nacionalidades.router")

const huespedRouter = require("./huesped.router")
const authRouter = require('./auth.router')


function routerApi (app) {
  app.use('/habitaciones', habitacionesRouter );
  app.use('/habitacionestipo', habitaciontipoRouter)
  // app.use('/hab', habitacionesDisponiblesRouter)
  app.use('/camas', camasRouter );
  app.use('/usuarios', usuariosRouter );
  app.use('/reservas', reservaRouter );
  //app.use('/imagenes', imgenRouter );
  app.use("/nacionalidades", nacionalidadesRouter);
  app.use('/auth', authRouter);
  app.use('/contacto', contactoRouter )
  // app.use('/huespedes', huespedRouter)
  app.use('/pagos', pagoRouter)
  app.use('/huespedes', huespedRouter)
  app.use('/hostel', infoHostelRouter)
}

module.exports = routerApi;